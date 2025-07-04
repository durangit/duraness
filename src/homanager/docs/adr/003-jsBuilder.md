# ADR-002: Adoção do Vite como ferramenta de build e desenvolvimento

## Status
Aceito

## Contexto

Durante o planejamento da stack de frontend para o projeto, avaliamos diversas ferramentas modernas de build e desenvolvimento, como Webpack, Parcel, Snowpack e Vite. O objetivo era encontrar uma solução que proporcionasse:

- Experiência de desenvolvimento fluida e rápida
- Build eficiente para produção
- Integração simples com frameworks modernos (como Vue, React, Svelte ou mesmo vanilla JS/TS)
- Baixo tempo de configuração e curva de aprendizado acessível
- Suporte a módulos ES (ESM)

## Decisão

Optamos por utilizar o Vite como ferramenta principal de desenvolvimento e build do frontend.

### Justificativas:

- ✅ **Desempenho no desenvolvimento** utilizando ES Modules nativos e um servidor de desenvolvimento baseado em native ESM + esbuild (escrito em Go), que proporciona início instantâneo e hot module replacement (HMR) quase instantâneo, mesmo em projetos grandes.
- ✅ **Build de produção eficiente com Rollup**, um bundler maduro e com suporte a tree-shaking, code splitting e otimizações avançadas. Isso garante bundles menores e mais otimizados que os de Webpack, por padrão.
- ✅ **Zero-config e DX moderna**, com a configuração padrão que cobre a maioria dos casos de uso comuns. Além disso, sua arquitetura baseada em plugins facilita extensões e integrações. A developer experience (DX) é consideravelmente mais moderna e enxuta que alternativas como Webpack.
- ✅ **Integração nativa com TypeScript** e outras tecnologias é simples e direto, muitas vezes com zero configuração adicional.
- ✅ **Ecossistema crescente e apoio da comunidade**, o que garante manutenção contínua e inovação constante.
- ✅ **Melhor alinhamento com as necessidades da equipe**, reduzindo o tempo de configuração e aumenta a produtividade desde o primeiro dia, especialmente para times que priorizam rapidez e foco em entrega de valor.

## Consequências

- ✅ O projeto se beneficia de uma DX mais fluida e builds mais rápidos.
- ⚠️ Dependemos da maturidade e manutenção do ecossistema do Vite.
- ⚠️ A equipe deverá manter-se atualizada com as práticas recomendadas no ecossistema Vite.
- ⚠️ Em casos mais avançados, como SSR personalizado ou configurações específicas de Rollup, será necessário conhecimento adicional.

## Alternativas Consideradas

- **Webpack**: muito flexível, mas com tempo de build mais lento, curva de aprendizado mais íngreme e configuração mais verbosa.
- **Parcel**: boa experiência out-of-the-box, mas menos configurável e menos usado em projetos complexos de larga escala.
- **Snowpack**: abandonado e substituído conceitualmente pelo Vite.