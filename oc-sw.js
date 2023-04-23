importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'); 

var CACHE_VERSION = 3;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-vp-oc-v' + CACHE_VERSION
};

//Page Link Example:
//https://asimut.github.io/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/index.html
var pageLink = 'https://asimut.github.io/VP-OC/';

workbox.setConfig({ debug: true });

self.addEventListener('install', function(event) {
  let ok,
    libjs = ['player-0.0.11.min', 'main.bundle', 'lzwcompress'],
    libcss = ['main.bundle', 'icomoon'],
    libfonts = ['icomoon', 'Lato-Black', 'Lato-Bold', 'Lato-Italic', 'Lato-Light', 'Lato-Regular'],
    assets =[
      '0C5R_Hho8AtfK_pJ_ZS0Y6uc5n2amivaW.png',
      '0DsR_iW3gQDaWARw_P1c5WYGq3jg-mCNZ.png',
      '1e42OmPhs7JAfvgu_3wcDpAmAcE2Xyp7a.png',
      '2dnIXeGHSwsFNcCD_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline-00001.png',
      '2G-j3z_5TV9fpfnw_00iaS05tFptaeCbk.png',
      '3c12IzvvH8lVrwCe_Sz_vyJhC9P2kae6N.png',
      '3LoH9AybzI780BJE_ZPmBKRlu0OrtPMw2.svg',
      '3YvPxw6FTEomwSJ__mUC3DORyoD6E4WAi.png',
      '4zH0hGtyeFo0FOEf_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks-00001.png',
      '6CEDl4B1iNJ7BR6V_LtxkH4s7Nriha1gg.png',
      '8naVKNG2pIU5_UsJ_mYWpiGscet6aDTb7.png',
      '23R_4Er9ti1Wku_5_-n9YNqPAl_oHkUcM.svg',
      '27jyDLMGzTTEo6eL_transcoded-cyqlI9DTLppcN8Vk-torso-00001.png',
      '53e8l-Y_RIVAMavw_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks.mp4',
      '76iuJ3tVGNjSo5cT_transcoded-6iZM7VOHmGoVJ7qg-lips.mp4',
      'ABNtO8SbZxMIQ9Ys_C88oIjnBMA5EDKh6.svg',
      'aUTZq5a1y-GK6sb2_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline-00001.png',
      'b8PCxE039PMYKS9z_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks.mp4',
      'BcxISrg7uAa7-jnB_4_cities.jpg',
      'Bz0DyjQmmAtyYXXi_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline-00001.png',
      'c2WDkUjoH1osvAAP_eg2U9dbqW5iiA1gu.png',
      'CNMmd5syIidZm5ml_e_xujU5j_OLzuM4p.png',
      'cwMD8aDewRgrvCGC_GEJmaWhVU7yhIAU-.svg',
      'DBtYgEn1K2sRFC0u_87lR_1YbKaT0xj89.svg',
      'DcdlVyc18p7DrZzE_l4DwlC6Zyzh7p3yI.svg',
      'dE13s2luDkdj8A86_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline.mp4',
      'dyaCEtDFGCI9aj0c_rbbCcjDvWWgedPLb.png',
      'eR552AtP2WAC7h-i_pLKe1xuQcV0s2V8D.png',
      'h5jSNiiNfydH726s_KEzpUfBEn0Az1Ge-.png',
      'Hm_3qNjv5DDTAfC5_transcoded-LalaPRKzNnds7fOX-lower-limbs.mp4',
      'hOAjFbZOhoh7bJrq_yjZQLNQnL37VJ8Ca.png',
      'HoPcgIn9bl4UxM-R_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks.mp4',
      'HQr2COM4wE4aFvtK_example-header-image.jpg',
      'iQoPKf9xABfs1Tj5_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks-00001.png',
      'iT5ONXnyQzomGPCL_YTyU0bPGcgSPuqVN.png',
      'j2oka6XchkXKudc3_transcoded-6iZM7VOHmGoVJ7qg-lips-00001.png',
      'j2R2TukJ91dTwmnP_small_1579124541.png',
      'jD2jNou8yYq3ZERZ_Q0fKDZtYxc315r7W.png',
      'jGiBoQrrsqg7UP8z_transcoded-LalaPRKzNnds7fOX-lower-limbs-00001.png',
      'JU0k8-OqaWFlOcR0_G5c__lWMeoUcW8eJ.png',
      'KCsjUjz9wmRxdVdk_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks.mp4',
      'l85x_jMzcqLkeTXQ_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks-00001.png',
      'L386Pedgoa0zNSKx_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline.mp4',
      'Lp6uv54boif9YsqK_uh4dqE7zsUI2r1wB.png',
      'lQaU8p6La5LtH_6p_5JjR802LtRnVnl-h.png',
      'LWaHiQH35KAU8AMC_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks-00001.png',
      'MTzFyqhP7wIlys2s_rirvyWZ-Z8H5N5WU.png',
      'N2qExIjRoKtb_Q9t_small.png',
      'nFXindi2gsAEnHIi_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks.mp4',
      'NgcwMnMo3WFniEpr_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline.mp4',
      'NJvj6oSexcuTU3Ih_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline-00001.png',
      'nLSYrVA1sc4TFXxv_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks-00001.png',
      'OaWz6FDlx6tC4Xlw_quote_background.jpg',
      'oSMpKlWBaiF9D1ur_Mz2l7axu4bYxv3M6.png',
      'ouHsSqCXFN6SCyrC_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks-00001.png',
      'oWyleFZEVRkP-KQj_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks.mp4',
      'PpYoc5vaVyotPjKf_zZq-bPMAXR15ya9M.png',
      'pwy6AEg586W5wcLe_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline.mp4',
      'pZzY220d5Dswipu2_transcoded-eZ9E531W2YCH-5Jd-upper-limbs-00001.png',
      'q6D7qzZJQTVqbepa_MnbOxGzPiF0rgjfF.png',
      'Qc89dZGxGN78CALI_SUhtQnImz_6ieU4S.png',
      'QqhTpStC2QfWWwBh_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks-00001.png',
      'sTj5nvr-gthbq_rD_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline-00001.png',
      'SZNa9UQMCdEhtgOb_sDS_9D364hA2SlJ-.svg',
      'SZqka_Ps1-LLqjXm_j0QP4VpqpRUbq5Ez.png',
      'TfSwAX1jpoyHAd1u_J_FVNfk8t0zWFs9F.png',
      'tV70LUBvEm3nHAoZ_eBNFJIOYzNOhWZYQ.svg',
      'u6FHIbTrvuUagDhd_transcoded-cyqlI9DTLppcN8Vk-torso.mp4',
      'u7eqNvmOfJScIRuD_LUi5YO0ctCiLxyfK-Full Prescribing Information.pdf',
      'UNjLYs2XaIDRPhzH_6IZvN3VbvJfZuVSv.png',
      'VPHpIMZtshF3sjR9_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline.mp4',
      'VRSzMpsFvOx0q_iw_pSQRJWXMj0UNOWMg-INGREZZA-Full-Prescribing-Information.pdf',
      'VxGl2hIOWIcutXMT_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks.mp4',
      'whuGbYE8N-n4yRKe_pUKlA_ZN5HnDD-9s.svg',
      'WxRImnQFVdjNRu0G_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks.mp4',
      'wya-Y_hDtP882kiI_1u5jkIIq4niuBhVo.svg',
      'wYTJGKne_aRegxUF_N1-UfLnIhcQWsJBy.png',
      'XjX0cxcVIf0JGOLd_oIvQVO0kU3JbZteJ.svg',
      'xkrz7TPGKInpg6y5_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks-00001.png',
      'XMzdfzb0B-36_NFj_9_OaSN0gZxqw1dV1.svg',
      'XNWkI5uKZhR4Bnj1_transcoded-eZ9E531W2YCH-5Jd-upper-limbs.mp4',
      'YBiTnqm-PS-_N1Ar_ykYH-2sOuLlt3xBh.svg',
      'zI_yVLKlHIe51pKy_d9U3AKfdex_kRXGd.png'
    ];
  var urlsToPrefetch = [
      pageLink,
      pageLink+'index.html',
      ...libjs.map(i => pageLink+'lib/' + i + '.js'),
      ...libcss.map(i => pageLink+'lib/' + i + '.css'),
      ...libfonts.map(i => pageLink+'lib/fonts/' + i + '.woff'),
      pageLink+'lib/fonts/icomoon.ttf',
      pageLink+'assets/custom/jquery-3.6.0.min.js',
      pageLink+'assets/custom/script.js',
      pageLink+'assets/custom/style.css',
      pageLink+'assets/custom/arrow_down.png',
      pageLink+'assets/custom/chat.svg',
      pageLink+'assets/custom/check.svg',
      pageLink+'assets/custom/cover_logo.png',
      pageLink+'assets/custom/down-arrow.svg',
      pageLink+'assets/custom/ingrezza-valbenazine-logo-n.svg',
      pageLink+'assets/custom/logo-modal.png',
      pageLink+'assets/custom/open-book.svg',
      ...assets.map(i => pageLink+'assets/' + i),
      pageLink+'oc-sw.js',
      pageLink+'manifest.json',
      pageLink+'152.png',
      pageLink+'144.png',
      pageLink+'64.png',
      pageLink+'32.png',
      pageLink+'android-launchericon-512-512.png'
  ];

  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant SW accessed via chrome://serviceworker-internals
  console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

  // self.skipWaiting();

  event.waitUntil(
    caches.open(CURRENT_CACHES.prefetch).then(async (cache) => {
      return cache.addAll(urlsToPrefetch);      
    }).then(() => {
      console.log('All files were successfully cached.');

      caches.open(CURRENT_CACHES.prefetch).then(cache => {
        cache.keys()
        .then(requests => console.log(requests))
      })

      self.skipWaiting();
    })
  );

});

self.addEventListener('activate', function(event) {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic will handle the case where
  // there are multiple versioned caches.
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // if (expectedCacheNames.indexOf(cacheName) === -1) {
          //   // If this cache name isn't present in the array of "expected" cache names, then delete it.
          //   console.log('Deleting out of date cache:', cacheName);
          //   return caches.delete(cacheName);
          // }
        })
        );
    })
  );    
});

self.addEventListener('fetch', function(event) {
  
  headersLog = [];
  for (var pair of event.request.headers.entries()) {
    console.log(pair[0]+ ': '+ pair[1]);
    headersLog.push(pair[0]+ ': '+ pair[1])
 }
 console.log('Handling fetch event for', event.request.url, JSON.stringify(headersLog));

  if (event.request.headers.get('range')) {
    console.log('Range request for', event.request.url);
    var rangeHeader=event.request.headers.get('range');
    var rangeMatch =rangeHeader.match(/^bytes\=(\d+)\-(\d+)?/)
    var pos =Number(rangeMatch[1]);
    var pos2=rangeMatch[2];
    if (pos2) { pos2=Number(pos2); }
    
    console.log('Range request for '+ event.request.url,'Range: '+rangeHeader, "Parsed as: "+pos+"-"+pos2);
    event.respondWith(
      caches.open(CURRENT_CACHES.prefetch)
      .then(function(cache) {
        return cache.match(event.request.url);
      }).then(function(res) {
        if (!res) {
          console.log("Not found in cache - doing fetch")
          return fetch(event.request)
          .then(res => {
            console.log("Fetch done - returning response ",res)
            return res.arrayBuffer();
          });
        }
        console.log("FOUND in cache - doing fetch")
        return res.arrayBuffer();
      }).then(function(ab) {
        console.log("Response procssing")
        let responseHeaders=  {
          status: 206,
          statusText: 'Partial Content',
          headers: [
            ['Content-Type', 'video/mp4'],
            ['Content-Range', 'bytes ' + pos + '-' + 
            (pos2||(ab.byteLength - 1)) + '/' + ab.byteLength]]
        };
        
        console.log("Response: ",JSON.stringify(responseHeaders))
        var abSliced={};
        if (pos2>0){
          abSliced=ab.slice(pos,pos2+1);
        }else{
          abSliced=ab.slice(pos);
        }
        
        console.log("Response length: ",abSliced.byteLength)
        return new Response(
          abSliced,responseHeaders
        );
      }));
  } else {
    console.log('Non-range request for', event.request.url);
    event.respondWith(
    // caches.match() will look for a cache entry in all of the caches available to the service worker.
    // It's an alternative to first opening a specific named cache and then matching on that.
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found response in cache:', response);
        return response;
      }
      console.log('No response found in cache. About to fetch from network...');
      // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
      // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
      return fetch(event.request).then(function(response) {
        console.log('Response from network is:', response);

        return response;
      }).catch(function(error) {
        // This catch() will handle exceptions thrown from the fetch() operation.
        // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
        // It will return a normal response object that has the appropriate error code set.
        console.error('Fetching failed:', error);

        throw error;
      });
    })
    );
  }
});
