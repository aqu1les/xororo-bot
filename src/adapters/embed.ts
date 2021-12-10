import { MessageEmbed } from 'discord.js';

export default function createEmbed(
  title: any,
  color: any,
  description: any,
  url: any = null,
  thumbnail: any = null,
  footer: any = null,
  timestamp: any = null
) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setColor(color)
    .setDescription(description);

  if (url) embed.setURL(url);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (footer) embed.setFooter(footer.text, footer.icon);
  if (timestamp) embed.setTimestamp();

  return embed;
}
