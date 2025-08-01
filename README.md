# promotions-client

Este projeto é um frontend Angular para automatização e gestão de promoções, integrando com uma API REST para:
- Cadastro, edição, remoção e envio de promoções para o Telegram
- Gestão de afiliados
- Agendamento de promoções
- Visualização de logs de envio
- Importação de promoções de parceiros (Magalu, AliExpress, Amazon, Mercado Livre, Shopee)

O sistema é responsivo, utiliza Tailwind CSS e Flowbite para o design, e oferece feedback visual global para todas as ações importantes.

## Como rodar o projeto

1. **Pré-requisitos:**
   - Node.js 18+
   - Angular CLI (`npm install -g @angular/cli`)

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure a URL da API:**
   - Edite o arquivo `src/environments/environment.ts` e ajuste o campo `apiUrl` para o endereço da sua API backend.

4. **Rode o projeto em modo desenvolvimento:**
   ```sh
   ng serve
   ```
   O app estará disponível em [http://localhost:4200](http://localhost:4200)

5. **Acesse as funcionalidades:**
   - Promoções: `/promotions`
   - Afiliados: `/affiliates`
   - Agendamentos: `/schedules`
   - Logs de envio: `/send-logs`
   - Importação Magalu: `/scraping`
   - Importação Parceiros: `/import`

## Observações
- O projeto já está pronto para integração com autenticação JWT e testes automatizados.
- Para produção, ajuste o arquivo `src/environments/environment.prod.ts` com a URL da API correta.
- Para dúvidas ou sugestões, consulte o código ou abra uma issue.

---

## 📁 Padrão de Organização do Projeto

- **src/shared/**: Tudo que for reutilizável/global (components, services, models, enums, utils, pipes, directives, etc).
    - **components/**: Componentes globais (navbar, footer, mensagens, etc).
    - **services/**: Serviços globais (mensagens, API, helpers, etc).
    - **models/**: Interfaces e tipos globais (Promotion, Affiliate, etc).
    - **enums/**: Enums e types globais (MessageType, etc).
    - **utils/**: Funções utilitárias globais.
    - **pipes/**: Pipes globais customizados.
    - **directives/**: Directives globais customizadas.
- **src/app/**: Cada feature/área do sistema tem sua própria pasta (promotions, affiliates, schedules, send-logs, scraping, import, user, etc).
    - Componentes, services, models, etc, que são exclusivos da feature permanecem na respectiva pasta.
- **src/environments/**: Configurações de ambiente.
- **src/styles.css**: Estilos globais.

**Dica:** Sempre que criar algo que pode ser reutilizado em mais de uma feature, coloque em `shared`. Se for exclusivo de uma área, mantenha na pasta da feature.
