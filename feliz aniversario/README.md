# Feliz Aniversário (introspectivo)

Página simples de felicitação com tom introspectivo.

Como usar

1. Abra `index.html` no seu navegador (duplo clique ou via PowerShell):

```powershell
# estando em c:\Users\Jfons\OneDrive\Desktop\feliz aniversario
Invoke-Item .\index.html
```

2. Clique em "Refletir" para ver uma mensagem com efeito de digitação.
3. Use "Modo noturno" para alternar entre claro/escuro.
4. Pressione `Esc` ou o botão "Fechar" para fechar o painel de reflexão.

Personalização

- Mensagens: edite a constante `lines` em `index.html`.
- Reduzir animações: o navegador respeita a preferência "Reduzir movimento" e exibirá o texto sem efeito de digitação.

Acessibilidade

- O texto de reflexão tem `role="status"` e `aria-live="polite"` para leitura por leitores de tela.
- O foco é movido para o botão "Fechar" quando o painel abre e retorna ao botão "Refletir" ao fechar.

Se quiser, eu posso:
- adicionar um arquivo de áudio local (música suave) com controles para reproduzir/pausar;
- adicionar confetes animados e optar por desativá-los quando prefers-reduced-motion estiver ativo;
- traduzir as mensagens para outro tom (mais formal, mais carinhoso, etc.).

Novas funcionalidades adicionadas

- Música ambiente sintetizada em tempo real (WebAudio). Use o botão "Tocar música" para ativar/pausear — note que o navegador exigirá uma interação do usuário antes de reproduzir áudio.
- Balões animados caindo gradualmente: visuais leves e coloridos para animar o dia. Você pode desativá-los com o botão "Bexigas".
- Todas as animações respeitam a preferência do usuário `prefers-reduced-motion` — se o navegador indicar isso, as animações e o efeito de digitação são reduzidos/desativados.

Personalização rápida

- Alterar volume inicial: edite `masterGain.gain.value` em `index.js`.
- Parar/retomar balões por padrão: altere a chamada final `startBalloons()` em `index.js`.

Se quiser, eu posso:
- exportar os balões como SVG mais detalhado (com cordão animado);
- adicionar um botão para carregar um arquivo de áudio local (.mp3/.ogg) e reproduzi-lo no lugar do som sintetizado (isso exigirá um input file e permissões do usuário).
