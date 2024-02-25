import css from './Gallery.module.css';
import { Link } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { motion } from 'framer-motion';
import JSONData from '../../data/data.json';

export const Gallery = () => {
  const data = JSONData;

  return (
    <section className={css.paintings}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 374: 1, 767: 2, 1439: 4 }}>
        <Masonry>
          {data.map((data, index) => (
            <motion.div
              key={index}
              className={css.painting}
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Link to={`/painting%description`} state={{ nr: index }}>
                <img
                  className={css.paintingImg}
                  src={`src${data.images.thumbnail}`}
                  alt={`painting ${data.name}`}
                />
                <div className={css.paintingGradiend}></div>
                <h2 className={css.paintingHeading}>{data.name}</h2>
                <p className={css.paintingText}>{data.artist.name}</p>
              </Link>
            </motion.div>
          ))}
          {/* </motion.ul> */}
        </Masonry>
      </ResponsiveMasonry>
      <h1 className={css.mainHeading}>galleria.</h1>
    </section>
  );
};
