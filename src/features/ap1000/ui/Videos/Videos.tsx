import { VIDEO_GROUPS, videoUrl } from "../../model/videos";

import styles from "./Videos.module.scss";

// The videos of the course in groups, each with a line on what it shows
const Videos = () => (
  <div className={styles.groups}>
    {VIDEO_GROUPS.map((group) => (
      <section key={group.title} className={styles.group} aria-label={group.title}>
        <h3 className={styles.title}>{group.title}</h3>
        <p className={styles.intro}>{group.intro}</p>
        <ul className={styles.list}>
          {group.videos.map((video) => (
            <li key={video.id} className={styles.video}>
              <span className={styles.play} aria-hidden="true" />
              <span className={styles.body}>
                <a className={styles.link} href={videoUrl(video.id)} target="_blank" rel="noopener noreferrer">
                  {video.title}
                </a>
                <span className={styles.description}>{video.description}</span>
              </span>
              <span className={styles.language} title="Мова відео">
                {video.language}
              </span>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);

export default Videos;
