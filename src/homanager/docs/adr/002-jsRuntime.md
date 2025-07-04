# ADR-002: Escolha do runtime Deno

## Status
Aceito

## Contexto

O projeto em questão necessita de um runtime moderno para execução de código JavaScript/TypeScript no backend. Entre as opções analisadas estão:

- Node.js: runtime amplamente utilizado, baseado em CommonJS e dependente de configuração externa para suporte completo a TypeScript.
- Bun: runtime emergente com alta performance, mas ainda instável em alguns cenários de produção.
- Deno: runtime criado pelos mesmos autores do Node.js, focado em segurança, suporte nativo a TypeScript e ESModules.

Os critérios considerados para escolha do runtime incluem:

- **Segurança** por padrão
- **Suporte nativo a TypeScript**
- **Organização e simplicidade de projeto**
- **Velocidade de desenvolvimento**
- **Ecossistema moderno**
- **Manutenção futura e clareza de dependências**

## Decisão

Optamos por adotar o **Deno** como runtime backend do projeto.

### Justificativas:

- ✅ **TypeScript nativo**, sem necessidade de transpilers ou configuração adicional.
- ✅ **Importação via URL ou módulos padronizados (`deno.land/x`)**, eliminando o uso de `node_modules` e reduzindo o acoplamento com o ecossistema NPM.
- ✅ **Segurança embutida**, com permissões explícitas para acesso a rede, disco e outros recursos — ideal para ambientes mais restritos.
- ✅ **APIs modernas**, incluindo suporte nativo a `fetch`, `Web Streams`, e outras interfaces Web.
- ✅ **Ferramentas embutidas** (`deno test`, `deno lint`, `deno fmt`, `deno bundle`), que reduzem a dependência de ferramentas externas.
- ✅ **Desempenho aceitável** para a maioria dos casos de uso, com inicialização rápida e boa performance para APIs e CLIs.
- ✅ Ecossistema está crescendo, com suporte a pacotes NPM desde a v1.28 (via compat layer, se necessário).

## Consequências

- ⚠️ Algumas bibliotecas Node.js ainda não são compatíveis nativamente. Solução: priorizar dependências escritas com suporte a ESModules, ou usar o suporte a NPM do próprio Deno quando necessário.
- ⚠️ A equipe precisará se familiarizar com a CLI e padrões do Deno (ex: permissões, importações via URL).
- ✅ Redução de complexidade no setup (sem Babel, tsconfig, bundlers extras).
- ✅ Projeto mais enxuto, mais seguro e moderno, ideal para longo prazo.

## Alternativas Consideradas

- **Node.js**: descartado por exigir maior configuração, ser mais permissivo em segurança e manter legado CommonJS.
- **Bun**: descartado por ainda estar em fase experimental e apresentar inconsistências em bibliotecas populares, apesar da performance superior.