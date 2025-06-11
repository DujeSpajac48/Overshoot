import {View,ScrollView,Text,StyleSheet,Platform} from 'react-native'
import SelectionBarButton from './SelectionBarButton';
export default function SelectionBar(){
   return(
      <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false} horizontal={true}>
         <View style={styles.scrollContent}>
           <SelectionBarButton>Legs</SelectionBarButton>
           <SelectionBarButton>Powerlifting</SelectionBarButton>
           <SelectionBarButton>Upper</SelectionBarButton>
           <SelectionBarButton>Back</SelectionBarButton>



         </View>

      </ScrollView>



   );
}

const styles = StyleSheet.create({
   scrollView:{
      maxHeight: '6%',
      // borderWidth: 1,


      },
   scrollContent:{
      flexDirection: 'row',
      backgroundColor: '#f6f6f9',
     
     

      
   },
})