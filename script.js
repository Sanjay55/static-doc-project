const fs = require("fs");
const buildScript = async () => {
  const data = await fetch(`https://cmsbeta.jaim.tech/STATIC-DOCS-TEST`)
    .then((res) => res.json())
    .then((repo) => ({
      content: repo.data,
    }));
  const content = data.content;
  const metaJson = {};
  content.map((cur) => {
    const basePath = cur.routeName;
    const metaJsonChildren = {};
    if (cur.content) {
      fs.writeFileSync(`./pages/${basePath}.mdx`, cur.content);
      metaJson[cur.routeName] = cur.title;
    } else if (cur.children?.length) {
      cur.children.map((children) => {
        const basePathChildren = `${basePath}/${children.routeName}`;
        metaJsonChildren[children.routeName] = children.title;
        const path = `./pages/${basePath}`;
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, { recursive: true });
        }

        if (children.content) {
          fs.writeFileSync(`./pages/${basePathChildren}.mdx`, children.content);
        }
        fs.writeFileSync(
          `./pages/${basePath}/_meta.json`,
          JSON.stringify(metaJsonChildren)
        );
      });
    }
    fs.writeFileSync(`./pages/_meta.json`, JSON.stringify(metaJson));
  });
};

buildScript();
