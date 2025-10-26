# 🌳 Visualizador de Árvores AVL e Rubro-Negra

Este desenvolvido para a disciplina de Estruturas de Dados Básicas II, implementa duas das principais estruturas de dados auto-balanceadas — **Árvore AVL** e **Árvore Rubro-Negra** — utilizando **JavaScript**, com visualização interativa através da biblioteca **D3.js**.
O objetivo é permitir a compreensão prática do comportamento e balanceamento dessas estruturas em tempo real.

---

## ⚙️ Funcionalidades

* 📥 Inserção de nós na árvore escolhida (AVL ou Rubro-Negra).
* ❌ Remoção de nós com rebalanceamento automático.
* 🔎 Busca de um valor específico com destaque visual.
* 🔄 Limpeza completa da árvore.
* 📊 Exibição de estatísticas:

  * Tipo da árvore atual.
  * Número total de nós.
  * Número de níveis (altura da árvore).
* 🎨 Visualização dinâmica com D3.js:

  * Cores e balanceamento da árvore em tempo real.
  * Destaque visual em nós buscados.

---

## 🛠️ Tecnologias Utilizadas

* **JavaScript (ES6+)**
* **D3.js**
* **TailwindCSS**
* **HTML5**

---

## 🗂️ Estrutura do Projeto

```
AVL-RedBlack-Tree/
├── js/
│   ├── classes/
│   │   ├── Tree.js
│   │   ├── TreeNode.js
│   │   ├── AvlTree.js
│   │   ├── RedBlackTree.js
│   │   ├── RBNode.js
│   │
│   ├── enums/
│   │   └── redBlackEnum.js
│   │
│   └── index.js
│
├── index.html
└── README.md

```

---

## ▶️ Como Executar

Você pode experimentar o projeto de duas formas:

### 🌐 **Executar Online**

Acesse diretamente pelo site:
👉 [**kk3tillen.github.io/avl-redblack-tree/**](https://kk3tillen.github.io/avl-redblack-tree/)



### 💻 **Executar Localmente**

Caso prefira rodar o projeto no seu computador:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Kk3tillen/avl-redblack-tree
   ```

2. **Acesse a pasta do projeto:**

   ```bash
   cd avl-redblack-tree
   ```

3. **Abra o projeto:**

   * Localize o arquivo `index.html` dentro da pasta do projeto.
   * Dê um duplo clique sobre ele ou abra-o manualmente pelo navegador.


* Nenhuma dependência precisa ser instalada, pois o projeto usa apenas bibliotecas em CDN.

---

## 🖥️ Interface e Visualização

A interface apresenta:

* Seleção do tipo de árvore (AVL ou Rubro-Negra)
* Campo para inserir valores
* Botões:

  * ➕ **Adicionar**
  * 🔍 **Buscar**
  * 🗑️ **Remover**
  * ♻️ **Limpar**

Além disso, são exibidas estatísticas:

* Tipo atual da árvore
* Número total de nós
* Altura (níveis)

---

## Autores

| [![Kézia Ketillen Santos Lima](https://avatars3.githubusercontent.com/u/88369589?s=100&v=4)](https://github.com/Kk3tillen) | [![Tiago Rodrigues dos Santos](https://avatars.githubusercontent.com/u/70401246?s=100&v=4)](https://github.com/tiago-rodrigues1) |
| :---: | :---: |
| **Kézia Ketillen Santos Lima** | **Tiago Rodrigues dos Santos** |

---

## 📄 Licença

Este projeto é de uso educacional e está licenciado sob a [MIT License](LICENSE).
