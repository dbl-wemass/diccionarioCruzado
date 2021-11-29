const
  files = [
    "adman",
    "amazonGodo",
    "amazonPrisa",
    "amazonVocentoSite",
    "amazonVocentoSlotname",
    "criteoDomain",
    "criteoSubid",
    "invibes",
    "quantum",
    "richaudience",
    "smartclip",
    "sunmedia"
  ],
  {
    existsSync,
    writeFileSync,
    readFileSync
  } = require("fs");

for (let file of files) {
  let filepath = `./csv/${file}.csv`;
  if (existsSync(filepath)) {

    let
      csv = readFileSync(filepath, {
        encoding: "utf-8"
      }).split("\n"),
      jotason = {},
      headers = false;
    for (let _row of csv) {
      let row = _row.replace(/"/g,"");
      if (!headers)
        headers = row.split("\t");
      else {
        let values = row.split("\t"),
          value = {},
          index;
        for (let contador = 0; contador < values.length; contador++) {
          if (headers[contador] === "coso") {
            index = values[contador];
          } else if (headers[contador] !== "origen")
            value[headers[contador]] = values[contador];
        }
        if(index!=="")
          jotason[index] = value;
      }

    }
    writeFileSync(`./json/${file}.json`, JSON.stringify(jotason, null, " "), {
      encoding: "utf-8",
      flag: "w"
    });
  }
}