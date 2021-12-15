import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { motion } from 'framer-motion';


const Header = () => {
  return (
    <div className='ui secondary pointing menu'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}>
        <Link to='/' className='item'>
          <i
            style={{ fontSize: '1.3em', paddingRight: '10%' }}
            className='fas fa-spider'
          />
          Recluse Stream
        </Link>
      </motion.div>
      <div className='right menu'>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
