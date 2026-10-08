(function(global){
  'use strict';
  function intersects(a,b){return !(b.x>=a.x+a.w||b.x+b.w<=a.x||b.y>=a.y+a.h||b.y+b.h<=a.y)}
  function contains(a,b){return b.x>=a.x&&b.y>=a.y&&b.x+b.w<=a.x+a.w&&b.y+b.h<=a.y+a.h}
  function prune(rects){
    const out=[];
    for(let i=0;i<rects.length;i++){
      let skip=false;
      for(let j=0;j<rects.length;j++){if(i!==j&&contains(rects[j],rects[i])){skip=true;break}}
      if(!skip&&rects[i].w>0.05&&rects[i].h>0.05)out.push(rects[i]);
    }
    return out;
  }
  function splitFree(free,used){
    if(!intersects(free,used))return [free];
    const r=[];
    if(used.x>free.x)r.push({x:free.x,y:free.y,w:used.x-free.x,h:free.h});
    if(used.x+used.w<free.x+free.w)r.push({x:used.x+used.w,y:free.y,w:free.x+free.w-(used.x+used.w),h:free.h});
    if(used.y>free.y)r.push({x:free.x,y:free.y,w:free.w,h:used.y-free.y});
    if(used.y+used.h<free.y+free.h)r.push({x:free.x,y:used.y+used.h,w:free.w,h:free.y+free.h-(used.y+used.h)});
    return r;
  }
  function bestPlacement(page,item,gap,allowRotate){
    const options=[{w:item.w,h:item.h,rotated:false}];
    if(allowRotate&&Math.abs(item.w-item.h)>.001)options.push({w:item.h,h:item.w,rotated:true});
    let best=null;
    for(const f of page.free){
      for(const o of options){
        const rw=o.w+gap,rh=o.h+gap;
        if(rw<=f.w+.0001&&rh<=f.h+.0001){
          const short=Math.min(f.w-rw,f.h-rh),area=f.w*f.h-rw*rh;
          const score=short*10000+area;
          if(!best||score<best.score)best={x:f.x,y:f.y,w:o.w,h:o.h,rw,rh,rotated:o.rotated,score};
        }
      }
    }
    return best;
  }
  function commit(page,p,item){
    const used={x:p.x,y:p.y,w:p.rw,h:p.rh};
    let next=[];
    for(const f of page.free)next.push(...splitFree(f,used));
    page.free=prune(next);
    page.items.push({...item,x:p.x,y:p.y,placedW:p.w,placedH:p.h,rotated:p.rotated});
  }
  function pack(items,width,height,gap=.15,allowRotate=true){
    const sorted=[...items].sort((a,b)=>(b.w*b.h)-(a.w*a.h)||Math.max(b.w,b.h)-Math.max(a.w,a.h));
    const pages=[];
    for(const item of sorted){
      let choice=null;
      for(let i=0;i<pages.length;i++){
        const p=bestPlacement(pages[i],item,gap,allowRotate);
        if(p&&(!choice||p.score<choice.p.score))choice={page:pages[i],p};
      }
      if(!choice){
        const page={free:[{x:0,y:0,w:width+gap,h:height+gap}],items:[]};pages.push(page);
        const p=bestPlacement(page,item,gap,allowRotate);
        if(!p){item.error=`Ukuran ${item.w}×${item.h} cm tidak muat di area ${width.toFixed(2)}×${height.toFixed(2)} cm`;page.unplaced=(page.unplaced||[]).concat(item);continue}
        choice={page,p};
      }
      commit(choice.page,choice.p,item);
    }
    return pages;
  }
  global.ZainOptimizer={pack};
})(window);
