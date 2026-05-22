import { useEffect, useState, useCallback } from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { PermissionsAndroid, Platform } from 'react-native';

type BluetoothStatus =
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export function useBluetooth() {
  const [status, setStatus] = useState<BluetoothStatus>('disconnected');
  const [device, setDevice] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  function log(msg: string, data?: any) {
    console.log(`[Bluetooth] ${msg}`, data ?? '');
  }

  async function pedirPermissoesBluetooth() {
    log('Solicitando permissões Bluetooth...');

    if (Platform.OS !== 'android') {
      log('Plataforma não Android, pulando permissões');
      return true;
    }

    if (Platform.Version >= 31) {
      log('Android 12+ detectado');

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      log('Resultado permissões', granted);

      return (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
      );
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    log('Permissão location', granted);

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  useEffect(() => {
    const connect = async () => {
      try {
        log('Iniciando conexão automática...');

        const permissoes = await pedirPermissoesBluetooth();

        if (!permissoes) {
          log('Permissões negadas');
          setError('Permissões Bluetooth negadas');
          setStatus('error');
          return;
        }

        setStatus('connecting');

        const enabled = await RNBluetoothClassic.isBluetoothEnabled();
        log('Bluetooth ativo?', enabled);

        if (!enabled) {
          setError('Bluetooth desligado');
          setStatus('error');
          return;
        }

        const devices = await RNBluetoothClassic.getBondedDevices();
        log('Dispositivos pareados encontrados', devices);

        const hc = devices.find(d => d.name?.includes('HC-06'));
        log('HC-06 encontrado?', hc);

        if (!hc) {
          setError('HC-06 não encontrado');
          setStatus('disconnected');
          return;
        }

        const connected = await hc.connect();
        log('Tentativa de conexão', connected);

        if (!connected) {
          setError('Falha ao conectar no HC-06');
          setStatus('error');
          return;
        }

        setDevice(hc);
        setStatus('connected');
        log('Conectado com sucesso!');
      } catch (err) {
        log('Erro na conexão', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setStatus('error');
      }
    };

    connect();
  }, []);

  const scan = useCallback(async () => {
    try {
      log('Iniciando scan manual...');

      const permissoes = await pedirPermissoesBluetooth();

      if (!permissoes) {
        log('Permissões negadas no scan');
        setError('Permissões Bluetooth negadas');
        setStatus('error');
        return;
      }

      setStatus('scanning');

      const found = await RNBluetoothClassic.getBondedDevices();
      log('Dispositivos encontrados no scan', found);

      const hc = found.find(d => d.name?.includes('HC-06'));
      log('HC-06 no scan?', hc);

      if (!hc) {
        setError('HC-06 não encontrado');
        setStatus('error');
        return;
      }

      setStatus('connecting');

      const connected = await hc.connect();
      log('Resultado conexão scan', connected);

      if (connected) {
        setDevice(hc);
        setStatus('connected');
        log('Conectado via scan!');
      } else {
        setError('Falha ao conectar no HC-06');
        setStatus('error');
      }
    } catch (err) {
      log('Erro no scan', err);
      setError(err instanceof Error ? err.message : 'Erro no scan');
      setStatus('error');
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      log('Desconectando...');

      if (!device) {
        log('Nenhum device conectado');
        return;
      }

      await device.disconnect();

      setDevice(null);
      setStatus('disconnected');

      log('Desconectado com sucesso');
    } catch (err) {
      log('Erro ao desconectar', err);
      setError('Erro ao desconectar');
      setStatus('error');
    }
  }, [device]);

  const send = useCallback(
    async (command: string) => {
      log('Enviando comando', command);

      if (!device) {
        log('Nenhum device conectado');
        return;
      }

      if (!command) {
        log('Comando vazio ignorado');
        return;
      }

      try {
        await device.write(command);
        log('Comando enviado com sucesso');
      } catch (err) {
        log('Erro ao enviar comando', err);
        setError('Erro ao enviar comando');
        setStatus('error');
      }
    },
    [device]
  );

  return {
    send,
    status,
    device,
    error,
    scan,
    disconnect,
  };
}