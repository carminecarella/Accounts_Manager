package accountsmanager;

public class Test {

	public static void main(String[] args) {
		String input = "The cow jumped over the moon";
		
		System.out.println("Origin string: " + input);
		
		String [] splitted = input.split(" ");
		
		StringBuilder buffer = new StringBuilder(input.length());
		
		for(int i = splitted.length-1; i >= 0; i--){
			buffer.append(splitted[i]);
			buffer.append(" ");
		}
		
		System.out.println("Reverse string: " + buffer.toString());
	}

}
