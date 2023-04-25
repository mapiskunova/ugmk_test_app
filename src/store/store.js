import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import sagas from "./sagas";
import products from "./products";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(sagas);

export { store };
