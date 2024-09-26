import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CadastroFuncionario from './pages/cadastroFuncionario';
import ConsultaEdicaoFuncionario from './pages/consultaEdicaoFuncionario';
import CadastroProdutos from './pages/cadastroProdutos';
import CatalagoProdutos from './pages/catalagoProdutos';
import Cupons from './pages/cupons';
import CadastroNovoCupom from './pages/cadastroNovoCupom';
import DetalhesCupom from './pages/detalhesCupom';
import DetalhesPromocao from './pages/detalhesPromocao';
import GerarPromocao from './pages/gerarPromocao';
import Home from './pages/home';
import Login from './pages/login';
import Pedidos from './pages/pedidos';
import Promocoes from './pages/promocoes';
import RelatorioVendas from './pages/relatorioVendas';
import Clientes from './pages/clientes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

