const { Client, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const moment = require('moment');

const client = new Client({
  puppeteer: {
    args: ['--no-sandbox'],
  }
});

// Onde você le o Qrcode
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Leia o código QR com seu celular para fazer login.');
});

client.on('ready', () => {
  console.log('Bot está pronto para enviar mensagens.');

  const groupName = 'TIGRE 🐯 100% 🃏';

  function enviarMensagemParaGrupo(groupName, message) {
    client.getChats().then((chats) => {
      const group = chats.find((chat) => chat.name === groupName);
      if (group) {
        client.sendMessage(group.id._serialized, message).then((result) => {
          console.log('Mensagem enviada com sucesso! FORTUNE-1');
        }).catch((error) => {
          console.error('Erro ao enviar a mensagem:', error);
        });
      } else {
        console.error('Grupo não encontrado!');
      }
    }).catch((error) => {
      console.error('Erro ao obter os chats:', error);
    });
  }

  const duracaoMinutos = 3;
  const tentativas = 25;
  const linkAcesso = 'https://sunybet.com/?v=2GJ4A4PPQ8E';
  const horarios = [
    "0:10",
    "0:36",
    "1:30",
    "1:45",
    "2:16",
    "2:53",
    "3:00",
    "3:41",
    "4:20",
    "4:37",
    "5:01",
    "5:07",
    "5:28",
    "5:38",
    "6:01",
    "6:07",
    "6:28",
    "6:38",
    "7:01",
    "7:07",
    "7:28",
    "7:38",    
    "8:05",    
    "8:35",
    "8:50",
    "8:57",
    "9:25",  
    "9:33", 
    "9:45", 
    "9:51",                       
    "10:00",
    "10:11",
    "10:33",
    "10:40",
    "11:10",    
    "11:21",    
    "11:44",
    "13:20",
    "13:33",
    "13:37",
    "14:07",
    "14:20",
    "14:31",
    "14:39",
    "14:55",
    "15:00",
    "15:33",
    "15:38",
    "16:10",
    "16:33",
    "16:38",
    "17:20",       
    "17:38",   
    "17:51",                    
    "18:08",
    "18:28", 
    "18:33", 
    "19:05",  
    "19:39", 
    "19:47", 
    "19:55", 
    "20:00",
    "20:38",
    "21:01",
    "21:07",
    "21:38",
    "22:07",
    "22:30",
    "22:37",
    "22:45",
    "22:49",
    "23:01",
    "23:08",
    "23:27",
    "23:37",
    "23:52"
  ];      

  function enviarMensagensAgendadas() {
    const now = moment();
    let nextMessageIndex = -1;
    for (let i = 0; i < horarios.length; i++) {
      const messageTime = moment(horarios[i], 'HH:mm');
      if (messageTime.isAfter(now)) {
        nextMessageIndex = i;
        break;
      }
    }

    if (nextMessageIndex !== -1) {
      const timeUntilNextMessage = moment.duration(moment(horarios[nextMessageIndex], 'HH:mm').diff(now)).asMilliseconds();
      setTimeout(() => {
        const horarioValidade = moment().add(duracaoMinutos, 'minutes').format('HH:mm');
        const message = `🚨ENTRADA CONFIRMADA🚨\n🍀Fortune Tiger 🐯\n⏰Estratégia: Horários Pagantes\n⚠Válido até ${horarioValidade}\n🌟Máximo de Jogadas: ${tentativas}\n\n*PODE JOGAR SEM MEDO QUE VAI SOLTAR A CARTA*🎴 ✅\nLink da plataforma que funciona os sinais👇🏽\n${linkAcesso}\n`;
        enviarMensagemParaGrupo(groupName, message);

        setTimeout(() => {
          const greenMessage = `☑SINAL FINALIZADO☑\nTIGRE SOLTOU A CARTA✅\nAGUARDE PRÓXIMO SINAL ⏰LINK PARA CADASTRO👇🏽\n${linkAcesso}`;
          enviarMensagemParaGrupo(groupName, greenMessage);
        }, 3 * 60 * 1000); // 3 minutos

        // Agendar a próxima mensagem
        enviarMensagensAgendadas();
      }, timeUntilNextMessage);
    }
  }

  // Iniciar o agendamento das mensagens
  enviarMensagensAgendadas();
});

client.initialize();
