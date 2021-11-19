const
  headers = {
    "criteoDomain": "coso,site",
    "criteoSubid": "coso,site,format,canal",
    "adman": "coso,publisher,site,medio,type",
    "amazonGodo": "coso,site",
    "amazonPrisa": "coso,site,canal",
    "amazonVocentoSite": "coso,site",
    "amazonVocentoSlotname": "coso,site,canal",
    "invibes": "coso,publisher,site,canal,formato",
    "quantum": "coso,publisher,site,canal,format",
    "richaudience": "coso,publisher,site,canal,format,position",
    "smartclip": "coso,publisher,site",
    "sunmedia": "coso,publisher,site"
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
      values = [`${headers[header]},origen`],
      props = headers[header].replace(/,?coso,?/i, "").split(",");
    for (let coso in json) {
      let
        row = [coso],
        rowValues = json[coso];
      for (let prop of props) {
        row.push(rowValues[prop] && rowValues[prop] !== "undefined" ? rowValues[prop] : "");
      }
      row.push(header);
      values.push(`"${row.join('","')}"`);
    }
    writeFileSync(`./csv/${header}.csv`, values.join("\n"), {
      encoding: "utf-8",
      flag: "w"
    });
  }
}