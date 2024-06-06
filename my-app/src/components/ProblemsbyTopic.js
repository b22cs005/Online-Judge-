import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './ProblemsbyTopic.module.css';
import {useNavigate} from 'react-router-dom';

const ProblemsbyTopic = () => {
  const navigate = useNavigate();
  const topicWiseProblems = (topic) => {
     navigate(`/problems/${topic}`);
  }
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const items = [
    { title: 'All problems' },
    { title: 'Dynamic Programming' },
    { title: 'Trees' },
    { title: 'Stacks and Queues' },
    { title: 'Heaps' },
    { title: 'Graphs' },
    { title: 'Two pointer' },
    { title: 'Math' },
  ];

  const colors = ['#f9b234', '#3ecd5e', '#e44002', '#952aff', '#cd3e94', '#4c49ea'];

  return (
    <section className={styles.slideContainer}>
      <h1>Popular DSA Topics</h1>
      <div className={styles.slideContent}>
        <Carousel responsive={responsive} className={styles.cardWrapper}>
          {items.map((item, index) => {
            const color = colors[index % colors.length];
            return (
              <div className={styles.agCoursesItem} key={index}>
                <a href="#" onClick={(e) => {e.preventDefault(); topicWiseProblems(item.title);}} className={styles.agCoursesItemLink}>
                  <div
                    className={styles.agCoursesItemBg}
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className={styles.agCoursesItemTitle}>{item.title}</div>
                </a>
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default ProblemsbyTopic;
