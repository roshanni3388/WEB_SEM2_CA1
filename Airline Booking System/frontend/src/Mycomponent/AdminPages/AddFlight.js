import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios';

import styled from 'styled-components';