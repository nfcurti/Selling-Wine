import {Component} from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import {redirect} from './redirect.js';
import logger from '../helpers/logger';

function setAgeLimit(value) {
  logger.log('ageLimit.setAgeLimit', value ? 'valid' : 'invalid');
  cookie.set('agelimit', value);

  redirect('/');
}

function getAgeLimit() {
  logger.log('ageLimit.getAgeLimit');
  var ageLimitValue = cookie.get('agelimit');
  return ageLimitValue;
}

export {setAgeLimit, getAgeLimit};
