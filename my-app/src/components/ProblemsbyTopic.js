import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ProblemsbyTopic.css';

const ProblemsbyTopic = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
  ];

  const colors = ['#f9b234', '#3ecd5e', '#e44002', '#952aff', '#cd3e94', '#4c49ea'];

  return (
    <section className="slideContainer">
      <h1>Popular DSA Topics</h1>
      <div className="slideContent">
        <Carousel responsive={responsive} className="cardWrapper">
          {items.map((item, index) => {
            const color = colors[index % colors.length];
            return (
              <div className="ag-courses_item" key={index}>
                <a href="#" className="ag-courses-item_link">
                  <div
                    className="ag-courses-item_bg"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="ag-courses-item_title">{item.title}</div>
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
