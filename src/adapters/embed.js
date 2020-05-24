const { RichEmbed } = require('discord.js');

function createEmbed(
    title,
    color,
    description,
    url = null,
    thumbnail = null,
    footer = null,
    timestamp = null
) {
    const embed = new RichEmbed()
        .setTitle(title)
        .setColor(color)
        .setDescription(description);

    if (url) embed.setURL(url);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (footer) embed.setFooter(footer.text, footer.icon);
    if (timestamp) embed.setTimestamp();

    return embed;
}

module.exports = createEmbed;
