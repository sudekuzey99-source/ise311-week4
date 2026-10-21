const CACHE="ise311-week4-f2c4ff2c7921";
const PREFIX="ise311-week4-";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",event=>event.waitUntil((async()=>{const c=await caches.open(CACHE); await c.addAll(FILES.map(x=>new URL(x,self.registration.scope).href));await self.skipWaiting();})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{for(const k of await caches.keys()) if(k.startsWith(PREFIX)&&k!==CACHE) await caches.delete(k); await self.clients.claim();})()));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;const u=new URL(event.request.url), scope=new URL(self.registration.scope);if(u.origin!==scope.origin||!u.pathname.startsWith(scope.pathname))return;
event.respondWith((async()=>{const c=await caches.open(CACHE);const home=new URL("./index.html",scope).href;if(event.request.mode==="navigate"){try{const r=await fetch(event.request);if(r.ok){await c.put(home,r.clone());return r;}}catch(e){}return await c.match(home)||Response.error();}const hit=await c.match(event.request);if(hit)return hit;try{const r=await fetch(event.request);if(r.ok)await c.put(event.request,r.clone());return r;}catch(e){return Response.error();}})());});
