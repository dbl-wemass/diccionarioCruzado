const
  headers = {
    "criteoDomain": "coso\tsite",
    "criteoSubid": "coso\tsite\tformat\tcanal",
    "adman": "coso\tpublisher\tsite\tmedio\ttype",
    "amazonGodo": "coso\tsite",
    "amazonPrisa": "coso\tsite\tcanal",
    "amazonVocentoSite": "coso\tsite",
    "amazonVocentoSlotname": "coso\tsite",
    "invibes": "coso\tpublisher\tsite\tcanal\tformato",
    "quantum": "coso\tpublisher\tsite\tcanal\tformat",
    "richaudience": "coso\tpublisher\tsite\tcanal\tformat\tposition",
    "smartclip": "coso\tpublisher\tsite",
    "sunmedia": "coso\tpublisher\tsite"
  },
  {
    existsSync,
    writeFileSync
  } = require("fs");

for (let header in headers) {
  let filepath = `./json/${header}.json`;
  if (existsSync(filepath)) {
    let
      json = require(filepath),
      values = [`${headers[header]}\torigen`],
      props = headers[header].replace(/\t?coso\t?/i, "").split("\t");
    for (let coso in json) {
      let
        row = [coso],
        rowValues = json[coso];
      for (let prop of props) {
        row.push(rowValues[prop] && rowValues[prop] !== "undefined" ? rowValues[prop] : "");
      }
      row.push(header);
      values.push(`${row.join('\t')}`);
    }
    writeFileSync(`./csv/${header}.csv`, values.join("\n"), {
      encoding: "utf-8",
      flag: "w"
    });
  }
}