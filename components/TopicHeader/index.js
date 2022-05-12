import PropTypes from "prop-types";
import Section from "../Section";
import styles from "./index.module.scss";
import { transformSrc } from "../../util/transformSrc";
import Image from "next/image";

TopicHeader.propTypes = {
  topic: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

export default function TopicHeader({ topic }) {
  return (
    <Section width="narrow" dark={true} style={{ background: "black" }}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={transformSrc(`/images/topics/${topic.slug}.jpg`)}
          layout="fill"
          alt="Topic Header Image"
        />
      </div>

      <div className={styles.text}>
        <h1 id={topic.slug}>{topic.name}</h1>
        {topic.description && <div>{topic.description}</div>}
      </div>
    </Section>
  );
}
