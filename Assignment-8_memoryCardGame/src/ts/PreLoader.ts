import {
  Loader,
} from 'pixi.js';
import { setResources } from './Textures';
import { Assets } from './assets';

function addAssets(loader:Loader, assets: {key:string, url:string}[]):void {
  assets.forEach((asset) => {
    loader.add(asset);
  });
}

let progDiv: HTMLDivElement;
function showProgress(e: any) {
  if (progDiv === undefined) {
    progDiv = document.createElement('div');
    progDiv.className = 'progress';
    document.body.appendChild(progDiv);
  }
  progDiv.style.width = `${e.progress}%`;
}

function loadComplete(loader:Loader, onCompleteCallback:()=>void): void {
  setResources(loader.resources);
  progDiv.style.display = 'none';
  onCompleteCallback();
}

export function preLoader(assetList: Assets, callback:() => void) : Loader {
  const loader = Loader.shared;
  if (assetList.baseUrl) {
    loader.baseUrl = assetList.baseUrl;
  }
  addAssets(loader, assetList.images);
  loader.onProgress.add(showProgress);
  loader.onComplete.add((l:Loader) => {
    console.log('res ', l.resources);
    loadComplete(l, callback);
  });
  loader.load();
  return loader;
}
