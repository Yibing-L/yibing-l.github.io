/* Standalone, illustrative research explainers. No hardware or study data. */
(() => {
  'use strict';

  const styles = `
    :host{display:block;color:#22382f;font:inherit;--ink:#22382f;--muted:#5d695f;--accent:#d16a39;--paper:#f5f2eb;--wash:#e5e9df}
    *{box-sizing:border-box}button,input{font:inherit}button{color:inherit}button:focus-visible,input:focus-visible{outline:3px solid var(--accent);outline-offset:4px}
    .demo{border:1px solid #22382f26;border-radius:3px;background:var(--paper);overflow:hidden}
    .head{padding:24px 26px 0}.eyebrow{font-size:10px;letter-spacing:.13em;text-transform:uppercase;font-weight:700;color:var(--muted);margin:0 0 9px}
    h3{font-size:clamp(21px,3vw,29px);line-height:1.15;font-weight:500;margin:0 0 10px}p{font-size:14px;line-height:1.65;margin:0;color:var(--muted)}
    .controls{display:flex;gap:7px;flex-wrap:wrap;padding:20px 26px 0}button{cursor:pointer;border:1px solid #22382f30;background:transparent;padding:10px 13px;border-radius:2px;font-size:12px;line-height:1.3;min-height:40px;transition:background .15s,color .15s}
    button:hover{background:var(--wash)}button[aria-pressed=true]{background:var(--ink);border-color:var(--ink);color:var(--paper)}.num{opacity:.6;margin-right:5px;font-size:10px}
    .visual{padding:19px 22px 9px}svg{display:block;width:100%;height:auto;overflow:visible}svg text{font-family:inherit}.node{fill:var(--paper);stroke:#22382f40;stroke-width:1.25}.node.active{fill:var(--ink);stroke:var(--ink)}.node-text{fill:var(--ink);font-size:12px}.node-text.active{fill:var(--paper)}.pipe-line{fill:none;stroke:#22382f30;stroke-width:1.5}.pipe-line.passed{stroke:var(--accent)}
    .stage-copy{margin:0 26px 24px;border-left:2px solid var(--accent);padding:2px 0 2px 16px;min-height:92px}.stage-copy h4{font-size:16px;font-weight:600;line-height:1.4;margin:0 0 5px}.stage-copy p{max-width:64ch}.foot{padding:15px 26px;border-top:1px solid #22382f1c;font-size:11px;line-height:1.6;color:var(--muted);background:#ffffff30}
    .route-path{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:4 7;opacity:.3}.route-walked{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.walls{fill:#e5e9df;stroke:#9ba79a;stroke-width:1.5}.room-name{font-size:11px;fill:var(--muted)}.map-label{font-size:10px;fill:var(--ink);font-weight:600;letter-spacing:.04em}.door{stroke:var(--paper);stroke-width:6}.reference{stroke:var(--muted);stroke-width:1;stroke-dasharray:3 5;opacity:.5}
    .legend{display:flex;gap:18px;flex-wrap:wrap;align-items:center;font-size:10px;color:var(--muted);padding:0 26px 15px}.legend span{display:flex;align-items:center;gap:7px}.swatch{display:inline-block;width:18px;height:0;border-top:2px solid var(--accent)}.swatch.dashed{border-top:1px dashed var(--muted)}.swatch.dot{width:7px;height:7px;background:var(--ink);border:0;border-radius:50%}
    .range-control{padding:4px 26px 20px}.range-top{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:10px;font-size:12px}.range-top output{color:var(--muted);font-variant-numeric:tabular-nums}input[type=range]{accent-color:var(--accent);width:100%;cursor:pointer;margin:0;min-height:24px}
    .metrics{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #22382f20}.metric{padding:19px 26px;border-right:1px solid #22382f20}.metric:last-child{border:0}.value{font-size:25px;line-height:1.2;font-weight:500;display:block;letter-spacing:-.03em;font-variant-numeric:tabular-nums}.metric-label{display:block;margin-top:6px;font-size:10px;line-height:1.4;color:var(--muted)}
    .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    @media(max-width:520px){.head{padding:20px 18px 0}.controls{padding:17px 18px 0;gap:6px}button{padding:9px 10px;font-size:11px}.visual{padding:18px 10px 10px}.stage-copy{margin:2px 18px 20px;min-height:130px}.foot{padding:13px 18px}.range-control{padding:4px 18px 18px}.metric{padding:17px 12px}.value{font-size:22px}.legend{padding-left:18px;padding-right:18px;gap:12px}}
    @media(prefers-reduced-motion:reduce){button{transition:none}}
  `;

  const stages = [
    {name:'Gesture', title:'1. Express an intention', text:'A gesture or operator command identifies a task. This schematic starts with “pick up the cup”; it does not classify a live gesture.', symbol:'✦'},
    {name:'Perception', title:'2. Ground the target in the scene', text:'Language-guided pointing, segmentation, and depth connect the requested object to a 3D target. Fresh observations matter when either the robot or scene moves.', symbol:'⊙'},
    {name:'Planning', title:'3. Find a feasible motion', text:'Inverse kinematics and collision-aware planning connect the current robot state to an approach. A valid plan still needs operator review and physical execution.', symbol:'⌁'},
    {name:'Execution', title:'4. Send the approved motion', text:'The embedded controller receives a timed trajectory. Feedback, command checks, and stop handling support execution while the robot moves.', symbol:'↗'},
    {name:'Feedback', title:'5. Observe before continuing', text:'Measured joint feedback informs completion and the next planning stage. Reaching a joint target alone does not establish a successful grasp or retained object.', symbol:'↻'}
  ];

  const routes = [
    {label:'Corridor route', points:[[80,280],[140,280],[140,180],[480,180],[480,75]], description:'A synthetic route from the entrance to the studio through the main corridor.'},
    {label:'With a wrong turn', points:[[80,280],[140,280],[140,180],[300,180],[300,75],[300,180],[480,180],[480,75]], description:'The same synthetic journey, with an illustrative wrong turn into the meeting room and a return to the corridor.'}
  ];
  const segmentLength = (a,b) => Math.hypot(b[0]-a[0],b[1]-a[1]);
  const length = points => points.slice(1).reduce((sum,p,i) => sum + segmentLength(points[i],p),0);
  const pathData = points => points.map((p,i) => `${i?'L':'M'}${p[0]},${p[1]}`).join(' ');
  function partialRoute(points, fraction) {
    let remaining = length(points)*fraction;
    const walked = [points[0]];
    for(let i=1;i<points.length;i++) {
      const a=points[i-1], b=points[i], segment=segmentLength(a,b);
      if(remaining>=segment) {walked.push(b);remaining-=segment;}
      else {const t=segment ? remaining/segment : 0;walked.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);break;}
    }
    return walked;
  }

  class ResearchDemo extends HTMLElement {
    connectedCallback() {
      if(this.shadowRoot) return;
      this.attachShadow({mode:'open'});
      this.shadowRoot.innerHTML = `<style>${styles}</style>`;
      if(this.getAttribute('kind')==='wayfind') this.renderWayfind();
      else this.renderHomeplus();
    }

    appendMarkup(markup) {
      const template = document.createElement('template');
      template.innerHTML = markup;
      this.shadowRoot.append(template.content.cloneNode(true));
    }

    renderHomeplus() {
      const nodes = stages.map((stage,i) => {
        const x=26+i*115;
        return `<g><rect class="node" data-node="${i}" x="${x}" y="50" width="96" height="74" rx="3"/><text class="node-text" data-node-text="${i}" x="${x+48}" y="79" text-anchor="middle" aria-hidden="true" style="font-size:22px">${stage.symbol}</text><text class="node-text" data-node-text="${i}" x="${x+48}" y="105" text-anchor="middle">${stage.name}</text></g>`;
      }).join('');
      const lines=stages.slice(1).map((_,i)=>`<path class="pipe-line" data-link="${i}" d="M${122+i*115} 87h19m-5-4 5 4-5 4"/>`).join('');
      this.appendMarkup(`<section class="demo" aria-labelledby="demo-title">
        <div class="head"><p class="eyebrow">Interactive explainer · Illustrative</p><h3 id="demo-title">From intention to action.</h3><p>Select a stage to explore a conceptual home+ manipulation pipeline.</p></div>
        <div class="controls" role="group" aria-label="Pipeline stages">${stages.map((stage,i)=>`<button type="button" data-stage="${i}" aria-pressed="${i===0}"><span class="num" aria-hidden="true">0${i+1}</span>${stage.name}</button>`).join('')}</div>
        <div class="visual"><svg viewBox="0 0 610 185" role="img" aria-labelledby="pipeline-title pipeline-description"><title id="pipeline-title">Conceptual home+ manipulation pipeline</title><desc id="pipeline-description">Five connected stages: gesture, perception, planning, execution, and feedback. Feedback informs a later planning cycle.</desc>${lines}${nodes}<path class="pipe-line" d="M534 128v24H304v-20m-4 5 4-5 4 5"/><text x="419" y="173" text-anchor="middle" fill="#5d695f" font-size="10">observe · update · replan</text></svg></div>
        <div class="stage-copy" aria-live="polite" aria-atomic="true"><h4></h4><p></p></div>
        <div class="foot">Conceptual explanation only. This is not a hardware interface, live robot feed, or report of task success.</div>
      </section>`);
      const update = index => {
        this.shadowRoot.querySelectorAll('[data-stage]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
        this.shadowRoot.querySelectorAll('[data-node]').forEach((node,i)=>node.classList.toggle('active',i===index));
        this.shadowRoot.querySelectorAll('[data-node-text]').forEach(node=>node.classList.toggle('active',Number(node.dataset.nodeText)===index));
        this.shadowRoot.querySelectorAll('[data-link]').forEach((node,i)=>node.classList.toggle('passed',i<index));
        this.shadowRoot.querySelector('.stage-copy h4').textContent=stages[index].title;
        this.shadowRoot.querySelector('.stage-copy p').textContent=stages[index].text;
      };
      this.shadowRoot.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>update(Number(button.dataset.stage))));
      update(0);
    }

    renderWayfind() {
      this.appendMarkup(`<section class="demo" aria-labelledby="demo-title">
        <div class="head"><p class="eyebrow">Interactive explainer · Synthetic data</p><h3 id="demo-title">A route tells a story.</h3><p>Compare two invented journeys through the same floor plan, then scrub through each route.</p></div>
        <div class="controls" role="group" aria-label="Synthetic route presets">${routes.map((route,i)=>`<button type="button" data-route="${i}" aria-pressed="${i===0}">${route.label}</button>`).join('')}</div>
        <div class="visual"><svg viewBox="0 0 600 360" role="img" aria-labelledby="map-title map-description"><title id="map-title">Synthetic wayfinding floor plan</title><desc id="map-description">An invented floor plan with an entrance at lower left, a studio at upper right, and a meeting room along the route. The orange line is a synthetic walking route; the dotted gray line is a straight-line reference.</desc>
          <rect x="30" y="30" width="540" height="300" fill="#f5f2eb" stroke="#9ba79a" stroke-width="1.5"/>
          <path class="walls" d="M30 30h150v100H30zM205 30h160v100H205zM390 30h180v100H390zM30 230h150v100H30zM230 230h120v100H230zM400 230h170v100H400z"/>
          <path class="door" d="M120 130h35M282 130h36M462 130h36M122 230h36M272 230h36M462 230h36"/>
          <text class="room-name" x="105" y="78" text-anchor="middle">Library</text><text class="room-name" x="285" y="60" text-anchor="middle">Meeting room</text><text class="room-name" x="480" y="56" text-anchor="middle">Studio</text><text class="room-name" x="290" y="285" text-anchor="middle">Workshop</text><text class="room-name" x="485" y="285" text-anchor="middle">Archive</text>
          <text class="room-name" x="300" y="212" text-anchor="middle">Main corridor</text>
          <path class="reference" d="M80 280L480 75"/>
          <path class="route-path" id="route-full"/><path class="route-walked" id="route-walked"/>
          <circle cx="80" cy="280" r="5" fill="#f5f2eb" stroke="#22382f" stroke-width="1.5"/><text class="map-label" x="80" y="307" text-anchor="middle">ENTRANCE</text>
          <rect x="475" y="70" width="10" height="10" fill="#22382f"/>
          <circle id="walker-halo" r="12" fill="#d16a39" opacity=".17"/><circle id="walker" r="5" fill="#d16a39" stroke="#f5f2eb" stroke-width="2"/>
          <path d="M511 312h40m-40-4v8m40-8v8" stroke="#5d695f" fill="none"/><text x="531" y="305" text-anchor="middle" font-size="9" fill="#5d695f">2 m</text>
        </svg></div>
        <div class="legend" aria-hidden="true"><span><i class="swatch"></i>Walking route</span><span><i class="swatch dashed"></i>Straight-line reference</span><span><i class="swatch dot"></i>Destination</span></div>
        <div class="range-control"><div class="range-top"><label for="route-progress">Journey progress</label><output id="progress-value" for="route-progress">0% · 0.0 m walked</output></div><input id="route-progress" type="range" min="0" max="100" value="0" step="1" aria-describedby="route-summary"/><p id="route-summary" class="sr-only"></p></div>
        <div class="metrics" aria-label="Synthetic route measurements"><div class="metric"><span class="value" id="route-length"></span><span class="metric-label">Route length</span></div><div class="metric"><span class="value" id="direct-length"></span><span class="metric-label">Straight-line distance</span></div><div class="metric"><span class="value" id="efficiency"></span><span class="metric-label">Route efficiency</span></div></div>
        <div class="foot">Invented layout and routes; not participant or study data. Efficiency = straight-line distance ÷ route length × 100. The straight-line reference can cross walls.</div>
      </section>`);
      let selected=0;
      const root=this.shadowRoot;
      const slider=root.querySelector('#route-progress');
      const update = () => {
        const route=routes[selected], fraction=Number(slider.value)/100;
        const fullLength=length(route.points), direct=segmentLength(route.points[0],route.points[route.points.length-1]);
        const walked=partialRoute(route.points,fraction), position=walked[walked.length-1];
        root.querySelector('#route-full').setAttribute('d',pathData(route.points));
        root.querySelector('#route-walked').setAttribute('d',pathData(walked));
        ['#walker','#walker-halo'].forEach(selector=>{const dot=root.querySelector(selector);dot.setAttribute('cx',position[0]);dot.setAttribute('cy',position[1]);});
        const walkedText=`${slider.value}% · ${(fullLength*fraction/20).toFixed(1)} m walked`;
        root.querySelector('#progress-value').textContent=walkedText;
        slider.setAttribute('aria-valuetext',walkedText);
        root.querySelector('#route-length').textContent=`${(fullLength/20).toFixed(1)} m`;
        root.querySelector('#direct-length').textContent=`${(direct/20).toFixed(1)} m`;
        root.querySelector('#efficiency').textContent=`${Math.round(direct/fullLength*100)}%`;
        root.querySelector('#route-summary').textContent=`${route.description} Total route ${(fullLength/20).toFixed(1)} meters; straight-line reference ${(direct/20).toFixed(1)} meters; route efficiency ${Math.round(direct/fullLength*100)} percent. Synthetic data only.`;
      };
      root.querySelectorAll('[data-route]').forEach(button=>button.addEventListener('click',()=>{
        selected=Number(button.dataset.route);
        root.querySelectorAll('[data-route]').forEach((item,i)=>item.setAttribute('aria-pressed',String(i===selected)));
        update();
      }));
      slider.addEventListener('input',update);
      update();
    }
  }

  if(!customElements.get('research-demo')) customElements.define('research-demo',ResearchDemo);
})();
