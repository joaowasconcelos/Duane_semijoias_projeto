import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CadastroFuncionario from './src/pages/cadastroFuncionario'
import ConsultaEdicaoFuncionario from './src/pages/consultaEdicaoFuncionario';
import CadastroProdutos from './src/pages/cadastroProdutos';
import CatalagoProdutos from './src/pages/catalagoProdutos';
import Cupons from './src/pages/cupons';
import CadastroNovoCupom from './src/pages/cadastroNovoCupom';
import DetalhesCupom from './src/pages/detalhesCupom';
import DetalhesPromocao from './src/pages/detalhesPromocao';
import GerarPromocao from './src/pages/gerarPromocao';
import Home from './src/pages/home';
import Login from './src/pages/login';
import Pedidos from './src/pages/pedidos';
import Promocoes from './src/pages/promocoes';
import RelatorioVendas from './src/pages/relatorioVendas';
import Clientes from './src/pages/clientes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
          <Stack.Screen name='CadastroProdutos' component={CadastroProdutos} options={{headerShown: false}}/>
          <Stack.Screen name='CatalagoProdutos' component={CatalagoProdutos} options={{headerShown: false}}/>
          <Stack.Screen name='CadastroFuncionario' component={CadastroFuncionario} options={{headerShown: false}}/>
          <Stack.Screen name='ConsultaEdicaoFuncionario' component={ConsultaEdicaoFuncionario} options={{headerShown: false}}/>
          <Stack.Screen name='Cupons' component={Cupons} options={{headerShown: false}}/>
          <Stack.Screen name='CadastroNovoCupom' component={CadastroNovoCupom} options={{headerShown: false}}/>
          <Stack.Screen name='DetalhesCupom' component={DetalhesCupom} options={{headerShown: false}}/>
          <Stack.Screen name='DetalhesPromocao' component={DetalhesPromocao} options={{headerShown: false}}/>
          <Stack.Screen name='GerarPromocao' component={GerarPromocao} options={{headerShown: false}}/>
          <Stack.Screen name='Pedidos' component={Pedidos} options={{headerShown: false}}/>
          <Stack.Screen name='Promocoes' component={Promocoes} options={{headerShown: false}}/>
          <Stack.Screen name='RelatorioVendas' component={RelatorioVendas} options={{headerShown: false}}/>
          <Stack.Screen name='Clientes' component={Clientes} options={{headerShown: false}}/>

          
          
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

