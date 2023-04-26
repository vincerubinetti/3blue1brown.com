import NextLink from "next/link";
import Tooltip from "../Tooltip";
import styles from "./index.module.scss";
import {useState, useEffect} from "react";

export default function SocialIcons() {
  const [youtubeSubscribers, setYoutubeSubscribers] = useState(null);
  const [twitterFollowers, setTwitterFollowers] = useState(null);
  const [patreonPatrons, setPatreonPatrons] = useState(null);

  const fallbackYouTubeCount = 5142090;
  const fallbackTwitterCount = 319570;
  const fallbackPatronCount = 6290;

  useEffect(() => {
    fetchFollowerCount(setYoutubeSubscribers, '/api/youtube_subscriber_count');
    fetchFollowerCount(setTwitterFollowers, '/api/twitter_follower_count');
    fetchFollowerCount(setPatreonPatrons, '/api/patreon_member_count');
  }, []);

  return (
    <div className={styles.socialIcons}>
      <div className={styles.topRow}>
        <Link
          link="https://www.youtube.com/3blue1brown"
          icon="fab fa-youtube"
          tooltip="The main event"
          hoverColor="#ff0000"
          restingColor="#ff0000"
          label={`${formatNumber(youtubeSubscribers || fallbackYouTubeCount)}`}
        />
        <Link
          link="https://twitter.com/3blue1brown"
          icon="fab fa-twitter"
          tooltip="Occasional animations and mathy threads"
          hoverColor="#1DA1F2"
          restingColor="#1DA1F2"
          label={`${formatNumber(twitterFollowers || fallbackTwitterCount)}`}
        />
        <Link
          link="https://www.patreon.com/3blue1brown"
          icon="fab fa-patreon"
          tooltip="Support future lessons"
          hoverColor="#f96854"
          restingColor="#f96854"
          label={`${formatNumber(patreonPatrons || fallbackPatronCount)}`}
        />
      </div>
      <div className={styles.restRow}>
        <Link
          link="https://3blue1brown.substack.com/"
          icon="fas fa-envelope-open-text"
          tooltip="Mailing list for new videos"
          hoverColor="#fe5901"
        />
        <Link
          link="https://www.reddit.com/r/3Blue1Brown/"
          icon="fab fa-reddit"
          tooltip="Discussion and community"
          hoverColor="#FF4500"
        />
        <Link
          link="https://store.dftba.com/collections/3blue1brown"
          icon="fas fa-store"
          tooltip="Store"
          hoverColor="#09f2fb"
        />
        <Link
          link="https://www.youtube.com/@GrantSanderson"
          icon="fab fa-youtube"
          tooltip="Second channel"
          hoverColor="#ff0000"
        />
        <Link
          link="https://www.instagram.com/3blue1brown/"
          icon="fab fa-instagram"
          tooltip="Instagram"
          hoverColor="#FFDC80"
        />
        <Link
          link="http://www.facebook.com/3blue1brown"
          icon="fab fa-facebook"
          tooltip="An unloved facebook presence"
          hoverColor="#4267B2"
        />
        <Link
          link="https://space.bilibili.com/88461692/#/"
          icon="fab fa-bilibili"
          tooltip="Chinese translations on Bilibili"
          hoverColor="#049ed1"
        />
        <Link
          link="https://www.tiktok.com/@3blue1brown"
          icon="fab fa-tiktok"
          tooltip="Excerpts from the main videos"
          hoverColor="#ff0050"
        />
        <Link
          link="https://3blue1brown.substack.com/feed"
          icon="fa-solid fa-rss"
          tooltip="RSS Feed"
          hoverColor="#ffff00"
        />
      </div>
    </div>
  );
}

async function fetchFollowerCount(setter, route){
  try {
    const response = await fetch(route);
    const data = await response.json();
    setter(data.followerCount);
  } catch (error) {
    console.error(error);
  }
}


function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(2) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number;
  }
}

function Link({ link, icon, tooltip, label = "", restingColor="inherit", hoverColor="inherit"}) {

  const [color, setColor] = useState(restingColor);

  return (
    <NextLink
      href={link} passHref
      className={styles.iconContainer}
      style={{'--hover-color': hoverColor}}
    >
      <Tooltip content={tooltip}>
          <div className={styles.iconLabelContainer}>
            <i className={icon} style={{ color: color }}/>
            {label && (
              <span className={styles.followers} >
                {label}
              </span>
            )}
          </div>
      </Tooltip>
    </NextLink>
  );
}