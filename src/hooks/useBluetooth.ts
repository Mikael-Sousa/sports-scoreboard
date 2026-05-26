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
  const [status, setStatus] =
    useState<BluetoothStatus>('disconnected');

  const [device, setDevice] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function requestBluetoothPermissions() {
    if (Platform.OS !== 'android') return true;

    if (Platform.Version >= 31) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
      );
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  useEffect(() => {
    const connect = async () => {
      try {
        const permissoes = await requestBluetoothPermissions();

        if (!permissoes) {
          setError('Permissões Bluetooth negadas');
          setStatus('error');
          return;
        }

        setStatus('connecting');

        const enabled = await RNBluetoothClassic.isBluetoothEnabled();

        if (!enabled) {
          setError('Bluetooth desligado');
          setStatus('error');
          return;
        }

        const devices = await RNBluetoothClassic.getBondedDevices();

        const hc = devices.find(d => d.name?.includes('HC-06'));

        if (!hc) {
          setError('HC-06 não encontrado');
          setStatus('disconnected');
          return;
        }

        const connected = await hc.connect();

        if (!connected) {
          setError('Falha ao conectar no HC-06');
          setStatus('error');
          return;
        }

        setDevice(hc);
        setStatus('connected');

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setStatus('error');
      }
    };

    connect();
  }, []);

  const scan = useCallback(async () => {
    try {
      const permissoes = await requestBluetoothPermissions();

      if (!permissoes) {
        setError('Permissões Bluetooth negadas');
        setStatus('error');
        return;
      }

      setStatus('scanning');

      const found = await RNBluetoothClassic.getBondedDevices();
      const hc = found.find(d => d.name?.includes('HC-06'));

      if (!hc) {
        setError('HC-06 não encontrado');
        setStatus('error');
        return;
      }

      setStatus('connecting');

      const connected = await hc.connect();

      if (connected) {
        setDevice(hc);
        setStatus('connected');
      } else {
        setError('Falha ao conectar no HC-06');
        setStatus('error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no scan');
      setStatus('error');
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (!device) return;

      await device.disconnect();
      setDevice(null);
      setStatus('disconnected');
    } catch {
      setError('Erro ao desconectar');
      setStatus('error');
    }
  }, [device]);

  const send = useCallback(
    async (command: string) => {
      if (!device || !command) return;


      try {
        await device.write(command);
      } catch {
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