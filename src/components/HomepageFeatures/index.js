import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Basic Documentation',
    Svg: require('@site/static/img/breaking-barriers-rafiki.svg').default,
    description: (
      <>
        Helping you gain the tools and knowledge to get started with iDempiere.
      </>
    ),
  },
  {
    title: 'Configuration Documentation',
    Svg: require('@site/static/img/open-source-rafiki.svg').default,
    description: (
      <>
        Helping you make iDempiere meet your specific needs.
      </>
    ),
  },
  {
    title: 'Production Documentation',
    Svg: require('@site/static/img/operating-system-rafiki.svg').default,
    description: (
      <>
        Helping you deploy, support, and scale iDempiere.
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
