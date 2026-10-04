"""Original mannequin collection studies. All output stays in this project."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'images'
OUT.mkdir(parents=True, exist_ok=True)

DEFS = '''<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#eee9e0"/><stop offset="1" stop-color="#cfc6b8"/></linearGradient>
<linearGradient id="noir" x1="0" y1="0" x2="1" y2=".2"><stop stop-color="#131413"/><stop offset=".28" stop-color="#666660"/><stop offset=".54" stop-color="#363833"/><stop offset="1" stop-color="#171917"/></linearGradient>
<linearGradient id="sand" x1="0" y1="0" x2="1" y2=".18"><stop stop-color="#8e7860"/><stop offset=".3" stop-color="#dbc8ab"/><stop offset=".6" stop-color="#c4ab8b"/><stop offset="1" stop-color="#8a755c"/></linearGradient>
<linearGradient id="white" x1="0" y1="0" x2="1" y2=".15"><stop stop-color="#c3beb6"/><stop offset=".35" stop-color="#fffdf7"/><stop offset=".6" stop-color="#eee9e0"/><stop offset="1" stop-color="#b1a99c"/></linearGradient>
<linearGradient id="linen" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#a89579"/><stop offset=".3" stop-color="#e1d3bb"/><stop offset=".6" stop-color="#ccba9d"/><stop offset="1" stop-color="#968267"/></linearGradient>
<linearGradient id="metal"><stop stop-color="#645444"/><stop offset=".3" stop-color="#d5bb91"/><stop offset=".55" stop-color="#e5d3b0"/><stop offset="1" stop-color="#7d674c"/></linearGradient>
<linearGradient id="plinth" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#c6beaf"/><stop offset=".55" stop-color="#f2ece0"/><stop offset="1" stop-color="#d3c8b7"/></linearGradient>
<pattern id="weave" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 1h5M1 0v5" stroke="#8f7b5f" stroke-width=".35" opacity=".28"/></pattern>
<filter id="shadow" x="-.5" y="-1" width="2" height="3"><feGaussianBlur stdDeviation="12"/></filter>
</defs>'''

STANDING = '''<g fill="url(#COLOR)" stroke="#5e584b" stroke-width=".65" stroke-opacity=".25">
<path d="M304 154Q308 137 310 126L338 126Q340 145 348 155L339 176H315Z"/>
<path d="M295 71C295 46 309 32 326 32C348 32 362 50 359 74L354 99C352 118 337 134 324 131C307 128 298 113 296 93Z"/>
<path d="M311 150C293 152 276 154 266 174C255 198 262 226 276 248L289 279C291 298 277 319 280 340C282 361 301 375 324 376C347 376 368 361 370 341C372 319 353 298 355 276L369 241C383 214 388 193 379 174C369 155 346 151 338 151C332 160 320 164 311 150Z"/>
<path d="M267 170C251 165 240 181 238 200L231 263C229 279 233 294 243 294C254 294 260 278 262 263L277 203C282 188 280 176 267 170Z"/>
<path d="M240 288C229 286 223 299 224 316L219 382C218 398 223 408 231 408C240 408 243 396 244 382L253 317C255 300 251 291 240 288Z"/>
<path d="M220 397C215 406 210 429 213 443L218 458C221 461 225 457 223 450L222 438L226 454C229 461 234 457 232 450L230 435L234 449C237 455 241 451 239 445L237 429C247 414 241 402 236 397Z"/>
<path d="M376 169C391 168 402 183 405 204L416 264C419 281 415 294 405 294C394 294 387 278 384 263L370 203C366 186 365 174 376 169Z"/>
<path d="M406 288C417 286 424 301 425 316L432 382C434 398 429 408 421 408C412 408 407 396 405 382L395 317C392 300 396 291 406 288Z"/>
<path d="M421 398C417 406 413 419 420 431L419 447C418 455 423 457 426 450L429 436L429 452C429 459 434 460 436 453L438 437L440 450C441 457 445 455 445 449L445 431C446 417 438 404 435 398Z"/>
<path d="M281 337C275 371 286 411 293 440C297 458 297 486 309 488C321 491 329 470 329 449L333 379C321 366 298 351 281 337Z"/>
<path d="M329 375C328 402 337 427 340 448C342 468 341 488 354 488C365 488 374 471 375 450L372 392C372 372 376 350 368 336Z"/>
<path d="M309 480C297 479 292 499 295 520L299 584C298 603 300 623 310 626C321 629 326 611 325 591L326 525C329 505 324 483 309 480Z"/>
<path d="M354 479C342 480 338 500 343 522L348 583C347 604 350 624 360 624C371 624 377 607 374 588L373 522C374 501 368 480 354 479Z"/>
<path d="M302 616L300 635C291 645 285 652 289 658L327 658C333 654 331 648 325 644L321 621Z"/>
<path d="M351 616L350 635C340 645 337 652 341 658L381 658C386 654 382 648 374 643L369 618Z"/>
</g><g fill="none" stroke="#fff8e8" stroke-width=".7" opacity=".15"><path d="M302 166Q322 181 346 166M269 218Q285 197 308 207M339 209Q360 195 373 215M326 214v48M300 285Q322 294 347 284M285 340Q315 355 330 376M311 397l-1 54M354 399l3 51M308 512l4 85M355 514l5 84"/></g>'''

SPRINT = '''<g fill="url(#COLOR)" stroke="#272a25" stroke-width=".8" stroke-opacity=".25">
<path d="M343 165L348 137L374 127L382 159L369 181Z"/>
<path d="M345 103C337 82 345 57 365 51C385 45 403 59 405 79L410 95L402 97C403 113 396 132 381 138C365 143 352 130 347 116Z"/>
<path d="M348 160C326 160 307 174 304 197C301 219 310 245 323 268L327 291C321 309 319 328 331 341C348 355 369 351 389 339C406 329 411 307 402 290L386 264C382 246 388 224 387 205C389 180 375 166 365 160Z"/>
<path d="M319 172C307 166 292 176 280 190L243 222C232 232 230 243 238 251C248 260 259 253 270 244L311 217C329 207 335 184 319 172Z"/>
<path d="M245 240C234 233 223 245 219 260L200 313C195 327 199 338 207 340C216 342 224 333 228 319L253 270C260 254 258 246 245 240Z"/>
<path d="M200 327L190 344L189 365C190 371 194 370 197 364L204 352L202 367C200 374 205 377 209 369L218 354L219 337Z"/>
<path d="M380 180C392 177 404 187 411 199L435 236C443 247 443 262 435 267C425 274 414 265 406 255L377 223C365 210 366 186 380 180Z"/>
<path d="M433 247C445 245 451 234 454 219L464 170C467 155 462 146 454 148C445 149 441 159 438 171L423 218C417 233 421 245 433 247Z"/>
<path d="M450 160L445 145L449 125C451 117 456 118 456 126L456 136L464 121C468 115 472 117 470 124L468 139L474 129C478 123 482 126 479 133L472 151L463 165Z"/>
<path d="M330 321C312 331 297 359 287 385L268 437C262 453 268 465 280 466C294 467 303 453 310 439L337 397C350 380 364 360 363 343Z"/>
<path d="M280 449C270 443 256 456 247 474L216 532C208 548 208 562 218 565C229 569 238 556 248 543L284 499C302 478 298 458 280 449Z"/>
<path d="M216 550L198 562L177 570C166 574 167 581 177 584L215 581L233 565L231 553Z"/>
<path d="M366 340C374 367 397 389 419 400L448 416C465 423 478 416 478 405C479 392 465 387 452 378L418 347C403 332 385 321 366 340Z"/>
<path d="M466 394C475 388 487 374 500 357L536 316C546 304 558 302 563 310C568 319 559 331 550 345L520 396C507 419 482 428 469 418Z"/>
<path d="M547 307L561 288L568 269C571 260 577 259 582 268L583 298L572 321L559 330Z"/>
</g><g fill="none" stroke="#dad9cb" stroke-width=".7" opacity=".2"><path d="M336 179Q352 195 378 182M318 213Q342 198 358 218M364 231l-16 42M328 290Q355 300 389 289M334 353l-32 73M383 351l47 43M275 473l-40 67"/></g>'''

DRESS = '''<g fill="url(#linen)" stroke="#7a6c59" stroke-width="1" stroke-opacity=".35">
<path d="M312 163L311 130Q325 121 341 130L340 164Z"/><ellipse cx="326" cy="127" rx="19" ry="7" fill="url(#metal)"/>
<path d="M311 155C295 157 270 159 254 178L233 217C242 237 257 242 273 236L280 259C289 293 286 319 274 351L259 393C255 415 266 444 285 454C309 464 343 464 367 453C386 443 399 415 393 392L378 351C365 318 364 290 373 259L381 236C397 243 412 237 420 218L399 179C384 159 358 157 341 155C333 164 320 164 311 155Z"/>
</g><path d="M311 155C295 157 270 159 254 178L233 217C242 237 257 242 273 236L280 259C289 293 286 319 274 351L259 393C255 415 266 444 285 454C309 464 343 464 367 453C386 443 399 415 393 392L378 351C365 318 364 290 373 259L381 236C397 243 412 237 420 218L399 179C384 159 358 157 341 155C333 164 320 164 311 155Z" fill="url(#weave)"/>
<g fill="none" stroke="#927d61" stroke-width="1" opacity=".6"><path d="M326 165v289M255 178Q290 237 278 310M396 178Q360 237 373 310M280 259Q324 277 372 259M277 330Q326 342 376 330M260 397Q326 415 394 397"/></g>
<path d="M320 461h13v168h-13Z" fill="url(#metal)"/><path d="M326 627L261 654M327 627L392 654M326 627v37" stroke="url(#metal)" stroke-width="8"/><ellipse cx="326" cy="666" rx="87" ry="9" fill="#79634a" opacity=".25"/>
<circle cx="326" cy="190" r="2" fill="#5e4c36"/><text x="326" y="300" text-anchor="middle" font-family="Georgia,serif" font-size="13" letter-spacing="5" fill="#715e44">LM</text>'''

def figure(shape, color):
    return shape.replace('COLOR', color)

def svg(name, content, width=650, height=800, background='#e8e3db'):
    (OUT / name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img">{DEFS}<rect width="{width}" height="{height}" fill="{background}"/>{content}</svg>', encoding='utf-8')

def floor(y=712):
    return f'<path d="M0 {y}h650" stroke="#c7bfb3" stroke-width=".8"/><ellipse cx="340" cy="{y+5}" rx="140" ry="15" fill="#6a5d4b" opacity=".16" filter="url(#shadow)"/>'

svg('sports-sprint.svg', floor(690) + '<path d="M85 92v545M85 637h470" stroke="#c6bdb0" stroke-width=".7"/>' + f'<g transform="translate(-31 30) scale(1.08)">{figure(SPRINT,"noir")}</g>')
svg('sports-gym.svg', floor() + f'<g transform="translate(0 28)">{figure(STANDING,"white")}</g>')
svg('boutique-muse.svg', floor() + '<rect x="82" y="86" width="482" height="626" rx="241" fill="#d4c9b9" opacity=".46"/>' + f'<g transform="translate(0 35)">{figure(STANDING,"sand")}</g>', background='#e4ddd2')
svg('boutique-essential.svg', floor() + f'<g transform="translate(-8 35) scale(1.03 1)">{figure(STANDING,"noir")}</g>')
svg('dressmaker-couture.svg', floor() + DRESS, background='#eae2d6')
svg('dressmaker-sartorial.svg', floor() + f'<g transform="translate(-32 0) scale(1.1 1)">{DRESS}</g>', background='#e3dbcf')
svg('hanger.svg', floor(635) + '''<path d="M326 292v-26c0-29 38-30 38-3c0 16-19 22-30 25" fill="none" stroke="url(#metal)" stroke-width="7"/><path d="M325 292L119 410Q105 421 118 439L167 453L325 348L485 453L534 439Q546 421 532 410Z" fill="url(#linen)" stroke="#8e785b" stroke-width="1"/><path d="M151 440h348" stroke="url(#linen)" stroke-width="13"/><path d="M168 412l151-91M337 321l149 91" fill="none" stroke="#f0e5cf" opacity=".5"/>''')
svg('rack.svg', floor(670) + '''<path d="M141 655V208Q141 192 158 192H490Q508 192 508 208V655M107 661h76M471 661h74" fill="none" stroke="url(#noir)" stroke-width="12"/><path d="M144 650h360" stroke="url(#noir)" stroke-width="6"/><path d="M240 199v24q20 3 0 22l-65 42h133l-64-42M395 199v24q20 3 0 22l-65 42h133l-64-42" fill="none" stroke="url(#metal)" stroke-width="3"/><path d="M177 290h127l-4 110H180Z" fill="#cebea5"/><path d="M338 290h116l-9 134H342Z" fill="#f5efe4"/>''')
hero = '''<rect width="850" height="1000" fill="url(#bg)"/><path d="M115 844V338a290 290 0 0 1 580 0v506Z" fill="#f0e9dc" opacity=".58"/><path d="M0 844h850" stroke="#c6baaa"/><ellipse cx="449" cy="836" rx="278" ry="32" fill="#74644f" opacity=".16" filter="url(#shadow)"/><path d="M143 789h578v77H143Z" fill="url(#plinth)"/><ellipse cx="432" cy="789" rx="289" ry="29" fill="#f1e9dc"/>'''
hero += f'<g transform="translate(271 99) scale(.86 1.02)">{figure(STANDING,"sand")}</g><g transform="translate(-74 72) scale(1.18)">{figure(SPRINT,"noir")}</g>'
hero += '<path d="M147 866h574" stroke="#bbaf9c"/><text x="425" y="944" text-anchor="middle" font-family="Georgia,serif" font-size="11" letter-spacing="7" fill="#82745e">THE FORM STUDIES</text>'
svg('showroom-hero.svg', hero, 850, 1000)
svg('sports-wide.svg', '<path d="M0 562h1600" stroke="#bcb3a6"/><ellipse cx="970" cy="564" rx="410" ry="18" fill="#615747" opacity=".12" filter="url(#shadow)"/>' + f'<g transform="translate(505 -7) scale(.87)">{figure(SPRINT,"noir")}</g><g transform="translate(886 -26) scale(.9)">{figure(STANDING,"white")}</g>', 1600, 650, '#d9d4cb')
(ROOT / 'public' / 'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#2b2927"/><path d="M13 12v40h38M22 43V12l14 22 15-22v31" fill="none" stroke="#e7d4b6" stroke-width="2"/></svg>', encoding='utf-8')
print(f'Generated {len(list(OUT.glob("*.svg")))} original SVG studies.')
