'use strict';

import React from 'react';
import { Tournament, Match } from './tournament/index';

React.render(
	<Tournament width="600" height="600" />, document.getElementById('app')
);

React.render(
	<Match />, document.getElementById('app-two')
);

export let __hotReload = true;
