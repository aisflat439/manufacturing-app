// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProductsImport } from './routes/products'
import { Route as LoginImport } from './routes/login'
import { Route as HandsImport } from './routes/hands'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as ProductsIndexImport } from './routes/products.index'
import { Route as ProductsPartsImport } from './routes/products.parts'
import { Route as ProductsModulesImport } from './routes/products.modules'
import { Route as ProductsPartsIndexImport } from './routes/products.parts.index'
import { Route as ProductsModulesIndexImport } from './routes/products.modules.index'
import { Route as ProductsPartsPartIdImport } from './routes/products.parts.$partId'
import { Route as ProductsModulesCreateImport } from './routes/products.modules.create'
import { Route as ProductsModulesModuleImport } from './routes/products.modules.$module'

// Create/Update Routes

const ProductsRoute = ProductsImport.update({
  path: '/products',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const HandsRoute = HandsImport.update({
  path: '/hands',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  path: '/',
  getParentRoute: () => ProductsRoute,
} as any)

const ProductsPartsRoute = ProductsPartsImport.update({
  path: '/parts',
  getParentRoute: () => ProductsRoute,
} as any)

const ProductsModulesRoute = ProductsModulesImport.update({
  path: '/modules',
  getParentRoute: () => ProductsRoute,
} as any)

const ProductsPartsIndexRoute = ProductsPartsIndexImport.update({
  path: '/',
  getParentRoute: () => ProductsPartsRoute,
} as any)

const ProductsModulesIndexRoute = ProductsModulesIndexImport.update({
  path: '/',
  getParentRoute: () => ProductsModulesRoute,
} as any)

const ProductsPartsPartIdRoute = ProductsPartsPartIdImport.update({
  path: '/$partId',
  getParentRoute: () => ProductsPartsRoute,
} as any)

const ProductsModulesCreateRoute = ProductsModulesCreateImport.update({
  path: '/create',
  getParentRoute: () => ProductsModulesRoute,
} as any)

const ProductsModulesModuleRoute = ProductsModulesModuleImport.update({
  path: '/$module',
  getParentRoute: () => ProductsModulesRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/hands': {
      preLoaderRoute: typeof HandsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/products': {
      preLoaderRoute: typeof ProductsImport
      parentRoute: typeof rootRoute
    }
    '/products/modules': {
      preLoaderRoute: typeof ProductsModulesImport
      parentRoute: typeof ProductsImport
    }
    '/products/parts': {
      preLoaderRoute: typeof ProductsPartsImport
      parentRoute: typeof ProductsImport
    }
    '/products/': {
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof ProductsImport
    }
    '/products/modules/$module': {
      preLoaderRoute: typeof ProductsModulesModuleImport
      parentRoute: typeof ProductsModulesImport
    }
    '/products/modules/create': {
      preLoaderRoute: typeof ProductsModulesCreateImport
      parentRoute: typeof ProductsModulesImport
    }
    '/products/parts/$partId': {
      preLoaderRoute: typeof ProductsPartsPartIdImport
      parentRoute: typeof ProductsPartsImport
    }
    '/products/modules/': {
      preLoaderRoute: typeof ProductsModulesIndexImport
      parentRoute: typeof ProductsModulesImport
    }
    '/products/parts/': {
      preLoaderRoute: typeof ProductsPartsIndexImport
      parentRoute: typeof ProductsPartsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutRoute,
  HandsRoute,
  LoginRoute,
  ProductsRoute.addChildren([
    ProductsModulesRoute.addChildren([
      ProductsModulesModuleRoute,
      ProductsModulesCreateRoute,
      ProductsModulesIndexRoute,
    ]),
    ProductsPartsRoute.addChildren([
      ProductsPartsPartIdRoute,
      ProductsPartsIndexRoute,
    ]),
    ProductsIndexRoute,
  ]),
])
