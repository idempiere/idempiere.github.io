import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Freedom',
    Svg: require('@site/static/img/breaking-barriers-rafiki.svg').default,
    description: (
      <>
        iDempiere will be open forever. You will never experience the bitterness of vendor lock-ins
      </>
    ),
  },
  {
    title: 'Community',
    Svg: require('@site/static/img/open-source-rafiki.svg').default,
    description: (
      <>
        Professionals from different fields and countries make iDempiere better every day
      </>
    ),
  },
  {
    title: 'High Quality',
    Svg: require('@site/static/img/operating-system-rafiki.svg').default,
    description: (
      <>
        State of the art technology right at the heart of iDempiere. Java, ZK, OSGi, Oracle, PostgreSQL, Maven.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
