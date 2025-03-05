// Macro for rolling an attack from a weapon in the player sheet.

main();

function attributeLabeler(atribute) {
  switch (atribute) {
    case 'atbCop':
      return 'Corpo';
    case 'atbCod':
      return 'Coordenação';
    case 'atbAgi':
      return 'Agilidade';
    case 'atbMnt':
      return 'Mente';
    case 'atbAtc':
      return 'Atenção';
    case 'atbCar':
      return 'Carisma';
  }
}

async function main() {
  const actorStats = entity.system.props;
  const weaponStats = linkedEntity.system.props;

  let rollModifiers = [
    {
      name: attributeLabeler(weaponStats.strikeAttribute),
      type: 'Atributo',
      value: parseInt(actorStats[`${weaponStats.strikeAttribute}`]),
      checked: true,
    },
    {
      name: 'Bônus de Rank',
      type: 'Sem Tipo',
      value: parseInt(actorStats.bonusDeRank),
      checked: true,
    },
  ];



  if (scope.pra) {
    rollModifiers.push({
      name: 'Penalidade Por Repetir Ações',
      type: 'Sem Tipo',
      value: -parseInt(actorStats.penalidadeRepetirAcoes),
      checked: true,
    });
  }

  if (scope.strike) {
    rollModifiers.push({
      name: 'Surto de Reiki',
      type: 'Estado',
      value: Math.floor(actorStats.bonusDeRank),
      checked: false,
    });
  } else {
    rollFinalModifier.push({
      name: 'Surto de Reiki',
      type: 'Estado',
      value: Math.floor(actorStats.bonusDeRank / 2),
      checked: false,
    });
  }

if(weaponStats.useCustomAttackModifier){
rollModifiers = [
    {
      name: 'Modificador de Ataque',
      type: 'Sem Tipo',
      value: parseInt(`${weaponStats.strikeCustomModifier}`),
      checked: true,
    }]
}


  function renderTable() {
    let rollModifierTable = `
        <tr style="text-align: left">
        <th>Modificador</th>
        <th>Tipo</th>
        <th>Valor</th>
        <th>Incluir</th>
        </tr>
        `;
    rollModifiers.forEach((modifier, index) => {
      rollModifierTable += `
            <tr>
            <td>${modifier.name}</td>
            <td>${modifier.type}</td>
            <td>${modifier.value >= 0 ? '+' : ''}${modifier.value}</td>
            <td><input type="checkbox" ${
              modifier.checked ? 'checked' : ''
            } id='modifier-${index}' data-key='${index}'/></td>
            </tr>`;
    });
    return rollModifierTable;
  }

  function updateDialogContent(html) {
    html.find('#modifier-table').html(renderTable());
    for (let index = 0; index < rollModifiers.length; index++) {
      html.find(`#modifier-${index}`).click(() => {
        var modifierChecked = html.find(`#modifier-${index}`).is(':checked');
        rollModifiers[index].checked = modifierChecked;
        console.log(rollModifiers);
        updateDialogContent(html);
      });
    }
    updateRollButtonLabel(html);
  }

  function updateRollButtonLabel(html) {
    let rollFinalModifier = rollModifiers.reduce(
      (acc, modifier) =>
        acc + (modifier.checked ? parseInt(modifier.value) : 0),
      0
    );
    html
      .find('.dialog-button.attack')
      .html(`Rolar (${rollFinalModifier >= 0 ? '+' : ''}${rollFinalModifier})`);
  }

  const attackInput = `
    <div styles="display:flex">
        <table id="modifier-table">
        ${renderTable()}
        </table>
        <hr>
        <div style="display:flex; gap: 3px; align-items: center; margin-top: 10px;">
            <input type="text" id="modifier-name" placeholder="Modificador" />
            <input type="number" id="modifier-value" style="width: 60px; text-align: center;" placeholder="1" />
            <select id="modifier-type">
                <option value="Atributo">Atributo</option>
                <option value="Estado">Estado</option>
                <option value="Habilidade">Habilidade</option>
                <option value="Situacional">Situacional</option>
                <option value="Sem Tipo">Sem Tipo</option>
            </select>
            <button id="addButton" style="background-color: #c0a080; border: 1px solid #888;">+Adicionar</button>
        </div>
    </div>
    `;

  let rollFinalModifier = rollModifiers.reduce(
    (acc, modifier) => acc + (modifier.checked ? parseInt(modifier.value) : 0),
    0
  );

  new Dialog({
    title: 'Rolando ataque',
    content: attackInput,
    buttons: {
      attack: {
        label: `Rolar (${
          rollFinalModifier >= 0 ? '+' : ''
        }${rollFinalModifier})`,
        callback: async html => {
          let rollFinalModifier = rollModifiers.reduce(
            (acc, modifier) =>
              acc + (modifier.checked ? parseInt(modifier.value) : 0),
            0
          );
          const rollString = `1d20 + ${rollFinalModifier}`;
          let roll = await new Roll(rollString).roll();
          let rollMessage = {
            type: CONST.CHAT_MESSAGE_STYLES.ROLL,
            speaker: ChatMessage.getSpeaker({ actor: actor }),
            rolls: [roll],
          };

          let buttons = {
            content:
              '<div style="display:flex"><button id="createDamage">Dano</button><button id="createCriticalDamage">Dano Crítico</button>',
            speaker: ChatMessage.getSpeaker({ actor: actor }),
          };

          await ChatMessage.applyRollMode(rollMessage, 'roll');
          await ChatMessage.create(rollMessage);
          await ChatMessage.create(buttons);

          Hooks.once('renderChatMessage', (chatItem, html) => {
            let reikiModifier = rollModifiers.find(
              mod => mod.name === 'Surto de Reiki'
            );
            if (reikiModifier && reikiModifier.checked) {
              (async () => {
                const docId = 'qoisd0Q6On01Qb4p';
                const compendiumKey = 'csb-remasters.scripts';
                const document = await game.packs
                  .get(compendiumKey)
                  .getDocument(docId);
                await document.execute({
                  actorStats: actorStats,
                  weaponStats: weaponStats,
                });
              })();
            }

            html.find('#createDamage').click(async () => {
              const docId = 'ITr30wD36JeinrX7';
              const compendiumKey = 'csb-remasters.scripts';
              const document = await game.packs
                .get(compendiumKey)
                .getDocument(docId);
              await document.execute({
                actorStats: actorStats,
                weaponStats: weaponStats,
              });
            });
            html.find('#createCriticalDamage').click(async () => {
              const docId = 'ITr30wD36JeinrX7';
              const compendiumKey = 'csb-remasters.scripts';
              const document = await game.packs
                .get(compendiumKey)
                .getDocument(docId);
              await document.execute({
                actorStats: actorStats,
                weaponStats: weaponStats,
                crit: true,
              });
            });
          });
        },
      },
    },
    render: html => {
      html.find('#addButton').click(() => {
        const modifierName = html.find('#modifier-name').val();
        const modifierValue = parseInt(html.find('#modifier-value').val());
        const modifierType = html.find('#modifier-type').val();

        if (!modifierName || isNaN(modifierValue)) {
          ui.notifications.error(
            'Por favor, insira um nome de modificador válido e um valor numérico como modificador.'
          );
          return;
        }

        rollModifiers.push({
          name: modifierName,
          type: modifierType,
          value: modifierValue,
          checked: true,
        });

        updateDialogContent(html);
      });

      for (let index = 0; index < rollModifiers.length; index++) {
        html.find(`#modifier-${index}`).click(() => {
          var modifierChecked = html.find(`#modifier-${index}`).is(':checked');
          rollModifiers[index].checked = modifierChecked;
          updateDialogContent(html);
        });
      }
    },
  }).render(true);
}