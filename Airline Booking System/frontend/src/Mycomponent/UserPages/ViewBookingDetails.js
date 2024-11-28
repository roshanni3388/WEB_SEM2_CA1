import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Center, Image, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from 'axios';
import styled from 'styled-components';