import { useEffect } from 'react';

const useVoiceCommand = (setFilters) => {
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.log('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      console.log('Voice command received:', command);

      // Process voice commands
      if (command.includes('show foreclosures') || command.includes('foreclosure')) {
        setFilters(prev => ({ ...prev, status: 'foreclosure' }));
        console.log('Filtering by foreclosures');
      } else if (command.includes('show all') || command.includes('all properties')) {
        setFilters(prev => ({ ...prev, status: 'all' }));
        console.log('Showing all properties');
      } else if (command.includes('melbourne')) {
        setFilters(prev => ({ ...prev, city: 'Melbourne' }));
        console.log('Filtering by Melbourne');
      } else if (command.includes('palm bay')) {
        setFilters(prev => ({ ...prev, city: 'Palm Bay' }));
        console.log('Filtering by Palm Bay');
      } else if (command.includes('cocoa')) {
        setFilters(prev => ({ ...prev, city: 'Cocoa' }));
        console.log('Filtering by Cocoa');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    // Make recognition available globally for testing
    window.startVoiceRecognition = () => {
      try {
        recognition.start();
        console.log('Voice recognition started');
      } catch (error) {
        console.error('Error starting voice recognition:', error);
      }
    };

    return () => {
      recognition.stop();
    };
  }, [setFilters]);
};

export default useVoiceCommand;
