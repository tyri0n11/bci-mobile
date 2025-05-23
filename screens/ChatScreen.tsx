import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';
import { Message } from '../types';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { id: '1', text: 'Hello! How are you feeling today?', sender: 'bot', timestamp: new Date() },
  ]);
  
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatHistory]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setChatHistory(prevChat => [...prevChat, userMessage]);
    setMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I understand how you're feeling. Would you like to talk more about it?",
        "That's interesting. Can you tell me more about why you feel that way?",
        "I'm here to listen. How long have you been feeling this way?",
        "Thank you for sharing. What do you think triggered these feelings?",
        "I appreciate your openness. Is there anything specific you'd like guidance on?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setChatHistory(prevChat => [...prevChat, botMessage]);
    }, 1000);
  };

  const renderChatItem = ({ item }: { item: Message }) => (
    <View 
      style={[
        styles.messageBubble, 
        item.sender === 'user' ? styles.userBubble : styles.botBubble
      ]}
    >
      <Text style={[
        styles.messageText,
        item.sender === 'user' ? styles.userMessageText : styles.botMessageText
      ]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={chatHistory}
            renderItem={renderChatItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatContent}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor={colors.text.light}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={message.trim() === ''}
          >
            <Ionicons 
              name="send" 
              size={24} 
              color={message.trim() === '' ? colors.text.light : colors.primary} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  chatContent: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.md,
    borderRadius: 20,
    marginVertical: spacing.xs,
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: colors.secondary,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: typography.sizes.medium,
  },
  userMessageText: {
    color: colors.white,
  },
  botMessageText: {
    color: colors.text.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxHeight: 100,
    fontSize: typography.sizes.medium,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default ChatScreen;