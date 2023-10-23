# niq-store-federated


![Screenshot 2023-10-22 at 23 46 53](https://github.com/GreenCamper/niq-store-federated/assets/21290403/cabafc30-8dcd-4f46-961b-80fccdc6c26d)


`niq-store-federated` is a monorepo that leverages Lerna and Yarn workspaces. Within the `packages` directory, there are several micro apps:

- **niq-root-store-front-app**: This is the primary micro app, tasked with fetching products and supplying contexts. It employs lazy loading, alongside React Suspense, to load other micro apps.
  
- **niq-left-nav-app**: This micro app handles the display of the dropdown menus and updates the shared context based on the selected product and category. These selections are then disseminated across the entire project.
  
- **niq-product-details-app**: This micro app focuses on presenting product details. It activates only when a product is selected within the shared context.
  
- **niq-category-renderer-app**: Dedicated to showcasing the bar chart and table, this micro app becomes visible only when a category is chosen, and no product is selected.
  
- **niq-store-shared-lib**: This package contains both the Selection Context and Fetch Context and is shared through the webpack federation plugin.

The `niq-root-store-front-app` acts as the host application, interacting with remote packages. In this scenario, they're part of the same monorepo; however, this logic is extendable to external packages. Utilizing webpack 5 federation, each micro app exposes its components and taps into the shared dependencies.


Instructions to Run the Project:

1. Ensure Lerna is installed globally with the following command:
   ```bash
   yarn global add lerna
   ```

2. Navigate to the monorepo root folder:
   ```bash
   cd niq-store-federated
   ```

3. Install the required dependencies:
   ```bash
   yarn install
   ```

4. Start the project:
   ```bash
   yarn start
   ```

The following use case diagram presents our system, and the subsequent architectural diagram illustrates the different micro apps and their relationships.

**Use Case diagram:
**

![usecase-niq](https://github.com/GreenCamper/niq-store-federated/assets/21290403/8d49ece2-7438-4c4f-ae28-fd824a5c4b47)


**Architecture:
**

![Screenshot 2023-10-22 at 23 49 40](https://github.com/GreenCamper/niq-store-federated/assets/21290403/27fa40b1-b8ad-4d11-b0a3-5ca46a588db4)


In case you encounter issues with the dependencies and need to reset everything, use the following commands:

```bash
yarn cache clean
rm yarn.lock
rm -rf node_modules
rm -rf packages/*/yarn.lock
rm -rf packages/*/node_modules
yarn install
```



