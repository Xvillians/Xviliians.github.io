/*
 * ADOBE SYSTEMS INCORPORATED
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.

 * NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
 * terms of the Adobe license agreement accompanying it.  If you have received this file from a
 * source other than Adobe, then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

(function() {
    'use strict';
    
    window.Configuration = {
        PLAYER: {
            NAME: 'TIHB VideoJS Player',
            VIDEO_ID: 'TIHB001',
            VIDEO_NAME: 'Microsite Video'
        },

        VISITOR: {
            MARKETING_CLOUD_ORG_ID: 'CC4D3704532E708F0A490D44@AdobeOrg',
            TRACKING_SERVER: 'sw88.go.com',
            DPID: 'UNUSED',
            DPUUID: 'UNUSED'
        },

        APP_MEASUREMENT: {
            RSID: 'wdgsecretinvasion',
            TRACKING_SERVER: 'sw88.go.com',
            PAGE_NAME: 'The Invasion Has Begun - Home'
        },

        HEARTBEAT: {
            TRACKING_SERVER: 'disneystudios.hb-api.omtrdc.net',
            PUBLISHER: 'CC4D3704532E708F0A490D44@AdobeOrg',
            CHANNEL: window.location.hostname,
            SDK: 'Media SDK 3.0.2 Player v1.0'
        }
    };
})();
