// Macro for rolling damage from a weapon in the player sheet.

console.log(scope)
    let additionalDamage = weaponStats.additionalDamage != 0 && weaponStats.additionalDamage != null ? ` + ${weaponStats.additionalDamage}[${weaponStats.baseDamageType}]` : '';
    let damageRollString = `(${weaponStats.baseDamageDieQuantity}d${weaponStats.baseDamageDieSize} + ${actorStats[weaponStats.baseDamageAttribute]})[${weaponStats.baseDamageType}]${additionalDamage}`;
    
    if(scope.crit){
        damageRollString = `2*(${damageRollString})`
    }    
    let roll = await new Roll(damageRollString).roll();

    let rollMessage = {
        type: CONST.CHAT_MESSAGE_STYLES.ROLL,
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        rolls: [roll],
    };

    let buttons = {
        content: '<div style="display:flex"><button id="dealDamage">Normal</button><button id="dealDoubleDamage">Dobro</button><button id="dealHalfDamage">Metade</button><button id="toggleSoak">Resistir</button></div>',
        speaker: ChatMessage.getSpeaker({ actor: actor }),
    };

    await ChatMessage.applyRollMode(rollMessage, "roll");
    await ChatMessage.create(rollMessage);
    await ChatMessage.create(buttons);

    // Hook to modify the content of dice-formula
    Hooks.once('renderChatMessage', (chatItem, html) => {
        html.find("#dealDamage").click(()=>dealDamage(roll.total,1));
        html.find("#dealDoubleDamage").click(()=>dealDamage(roll.total,2));
        html.find("#dealHalfDamage").click(()=>dealDamage(roll.total,0.5));
    });

async function dealDamage(damage,multiplier){
    let selectedActor = canvas.tokens.controlled;
    if(selectedActor.length > 1){
        ui.notifications.error("Please select only one token")
        return;
      }
      console.log(selectedActor)
    let actorData = selectedActor[0].actor.system.props;
    let totalDamage = damage * multiplier;
    console.log(actorData)
    let newHealth = actorData['hp_Atual'] - totalDamage;
    if (newHealth <= 0){
        newHealth = 0;
    }
    
    await selectedActor[0].actor.update({"system.props.hp_Atual": newHealth});

    let damageMessage = {
        content: `Dealing ${totalDamage} damage to ${actorData.name}`,
        speaker: ChatMessage.getSpeaker({ actor: actor }),
    };
    ChatMessage.create(damageMessage)
}
   