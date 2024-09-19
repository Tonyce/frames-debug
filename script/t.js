// fetch(
//   `http://100.26.48.19:3000/curationnft/frames?castHash=0xe01a7e4fcf9283676af5dd851bbef0b5e714da63`
// )
//   .then((resp) => resp.text())
//   .then(console.log);
const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;
(async () => {
  for (let i = 0; i < 1; i++) {
    const resp = await fetch(
      `http://100.26.48.19:3000/curationnft/frames?castHash=0xe01a7e4fcf9283676af5dd851bbef0b5e714da63`
    );
    const data = await resp.text();
    // console.log(data);
    const dom = new JSDOM(data);
    const image = dom.window.document.querySelector(
      "meta[name='fc:frame:image']"
    ).content;
    console.log(image);
    const imgResp = await fetch(image);
    const imgBlob = await imgResp.blob();
    const imgBuff = await imgBlob.arrayBuffer();
    fs.writeFileSync(`test.png`, Buffer.from(imgBuff));
  }
  // .then((resp) => resp.text())
  // .then(console.log);
})();
