{ pkgs }: {
  idx = {
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/App.jsx"
          "README.md"
        ];
        checkDependencies = "npm audit fix";
      };
      onStart = {
        runServer = "npm run dev";
      };
    };
  };
}
