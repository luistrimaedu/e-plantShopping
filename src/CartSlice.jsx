import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
        console.log("Added an existing product");
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
        console.log("new product");
      }
    },
    removeItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const index = state.items.findIndex(item => item.name === name);
      console.log("state from remove: ",state.items);
      console.log("index: :", index)
      //state.items = state.items.filter(item => item.name !== action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);;
      } else {
        console.log(`${item.name} no está en el carrito`);
      }

    },
    updateQuantity: (state, action) => {
      const {name, quantity} = action.payload;
      console.log("name update: " ,name);
      const itemToUpdate = state.items.find(item => item.name === name);
      console.log("itemToUpdate: ",itemToUpdate);
      console.log("payload: ",action.payload);
      //console.log("item.name: ",item.name);
      
      if (itemToUpdate){
        itemToUpdate.quantity = quantity;
      }
      
      //const existingItem = state.items.find(item => item.name === name);
      /*const updatedItems = state.items.map(item => {
        if (item.name === name) {
          // Si encontramos el ítem, actualizamos su cantidad
          return {
            ...item,  // Copiamos las demás propiedades del ítem
            quantity: quantity  // Actualizamos solo la propiedad quantity
          };
        }
        return item;  // Si no es el ítem que buscamos, lo dejamos igual
      });*/
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
