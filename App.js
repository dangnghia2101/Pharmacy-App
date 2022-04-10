import React, {useState} from 'react';
import { 
  StyleSheet, 

} from 'react-native';

import { UserContextProvider } from './src/components/user/UserContext';
import { ProductContextProvider } from './src/components/products/ProductContext';

import { Navigation } from './src/components/navigation/Navigation'

export default function App() {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        <Navigation/>
      </ProductContextProvider>
    </UserContextProvider>
  );
}

