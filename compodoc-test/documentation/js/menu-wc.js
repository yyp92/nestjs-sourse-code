'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">compodoc-test documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AaaModule.html" data-type="entity-link" >AaaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' : 'data-bs-target="#xs-controllers-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' :
                                            'id="xs-controllers-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' }>
                                            <li class="link">
                                                <a href="controllers/AaaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AaaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' : 'data-bs-target="#xs-injectables-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' :
                                        'id="xs-injectables-links-module-AaaModule-9b5c85bdffdeebe0d0407fc6e4c6af6d45797c5f4b9b26e6a98e645da841e1316fa30368fc0196d09f3d8d8f6fbc96088430a42cc17dc34fc121041cb7b320a2"' }>
                                        <li class="link">
                                            <a href="injectables/AaaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AaaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' : 'data-bs-target="#xs-controllers-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' :
                                            'id="xs-controllers-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' :
                                        'id="xs-injectables-links-module-AppModule-0d021522a14d0c9700f86e301703ba675ae979293b272d2ba49d8d8c9dad7ce1763673433bce87a6a8c2d5fb4e49ad089000c7750dbcf24e1494d61cca51f73f"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BbbModule.html" data-type="entity-link" >BbbModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' : 'data-bs-target="#xs-controllers-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' :
                                            'id="xs-controllers-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' }>
                                            <li class="link">
                                                <a href="controllers/BbbController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BbbController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' : 'data-bs-target="#xs-injectables-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' :
                                        'id="xs-injectables-links-module-BbbModule-2889844fecb394375b820e2b3ad2fa55f2a8ae3e148ed600b34c1d3846de1c585bf5b661ca6689690bfbf2ff2e75468deecc2e6682f47ec4388a43f6fceea865"' }>
                                        <li class="link">
                                            <a href="injectables/BbbService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BbbService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AaaController.html" data-type="entity-link" >AaaController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/BbbController.html" data-type="entity-link" >BbbController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Aaa.html" data-type="entity-link" >Aaa</a>
                            </li>
                            <li class="link">
                                <a href="classes/Bbb.html" data-type="entity-link" >Bbb</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAaaDto.html" data-type="entity-link" >CreateAaaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBbbDto.html" data-type="entity-link" >CreateBbbDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAaaDto.html" data-type="entity-link" >UpdateAaaDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateBbbDto.html" data-type="entity-link" >UpdateBbbDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AaaService.html" data-type="entity-link" >AaaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BbbService.html" data-type="entity-link" >BbbService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});