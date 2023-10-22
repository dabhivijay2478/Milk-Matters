import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetailsScreen from './screens/ProductDetailsScreen';
import HomeScreen from './screens/HomeScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import { Pressable, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import WishlistScreen from './screens/WishlistScreen';
import TrackingOrderScreen from './components/TrackingOrder';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  // const itemsCount = useSelector((state) => state.cart.items.length);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={({ navigation }) => ({
            // headerRight: () => (
            //   <Pressable
            //     onPress={() => navigation.navigate('ShoppingCart')}
            //     style={{ flexDirection: 'row' }}>
            //     <FontAwesome5 name='shopping-bag' size={18} color='gray' />
            // <Text style={{ marginLeft: 5, fontWeight: '500' }}>
            //   {itemsCount}
            // </Text>
            //   </Pressable>
            // ),
            header: () => <Header title='Sneaker Spot' />,
            
            // headerShown: false
          })}
        />
        <Stack.Screen
          name='ProductDetails'
          component={ProductDetailsScreen}
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen name='ShoppingCart' component={ShoppingCartScreen} />
        <Stack.Screen name='WishlistScreen' component={WishlistScreen} />
        {/* <Stack.Screen name='TrackOrder' component={TrackingOrderScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
