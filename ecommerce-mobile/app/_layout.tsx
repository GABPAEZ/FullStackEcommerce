import '@/global.css';
import { Stack, Tabs } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { textStyle } from '../components/ui/text/styles';

export default function Rootlayout() {
  return (
    <GluestackUIProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Shop' }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
      </Stack>
    </GluestackUIProvider>
  );
}
