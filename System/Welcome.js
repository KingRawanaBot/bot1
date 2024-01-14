const {checkWelcome}= require('./MongoDB/MongoDb_Core');

module.exports = async (WhaX, anu) => {
  try {
    let metadata = await WhaX.groupMetadata(anu.id);
    let participants = anu.participants;
    let desc = metadata.desc;
    if (desc == undefined) desc = "No Description";

    for (let num of participants) {
      try {
        ppuser = await WhaX.profilePictureUrl(num, "image");
      } catch {
        ppuser = botImage4;
      }

      if (anu.action == "add") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Joined/Got Added in: ${
            metadata.subject
          }\n`
        );
        WhaXtext = `
Hello @${WAuserName.split("@")[0]} How ara you,

Welcome to *${metadata.subject}*.

*🧣 Group Description 🧣*

${desc}

*Thank You.*
  `;
        if (WELstatus) {
          await WhaX.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: WhaXtext,
            mentions: [num],
          });
        }
      } else if (anu.action == "remove") {
        const WELstatus = await checkWelcome(anu.id);
        let WAuserName = num;
        console.log(
          `\n+${WAuserName.split("@")[0]} Left/Got Removed from: ${
            metadata.subject
          }\n`
        );
        WhaXtext = `
  @${WAuserName.split("@")[0]} left the group.
  `;
        if (WELstatus) {
          await WhaX.sendMessage(anu.id, {
            image: { url: ppuser },
            caption: WhaXtext,
            mentions: [num],
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};