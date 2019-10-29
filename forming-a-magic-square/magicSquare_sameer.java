import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class Solution {

    // Complete the formingMagicSquare function below.
    static int formingMagicSquare(int[][] s) {
        int[][] res1 =
        {{4, 9, 2},
        {3, 5, 7},
        {8, 1, 6}};

        int[][] res2 =
        {{8, 1, 6},
        {3, 5, 7},
        {4, 9, 2}};

        int[][] res3 =
        {{8, 3, 4},
        {1, 5, 9},
        {6, 7, 2}};

        int[][] res4 =
        {{4, 3, 8},
        {9, 5, 1},
        {2, 7, 6}};

        int[][] res5 =
        {{6, 1, 8},
        {7, 5, 3},
        {2, 9, 4}};

        int[][] res6 =
        {{2, 9, 4},
        {7, 5, 3},
        {6, 1, 8}};

        int[][] res7 =
        {{2, 7, 6},
        {9, 5, 1},
        {4, 3, 8}};

        int[][] res8 =
        {{6, 7, 2},
        {1, 5, 9},
        {8, 3, 4}};

        int cost1 = diff(s, res1);
        int cost2 = diff(s, res3);
        int cost3 = diff(s, res5);
        int cost4 = diff(s, res7);

        int cost5 = diff(s, res2);
        int cost6 = diff(s, res4);
        int cost7 = diff(s, res6);
        int cost7 = diff(s, res8);

        int min = Math.min(cost1, Math.min(cost2, Math.min(cost3, cost4)));
        int min1 = Math.min(cost5, Math.min(cost6, Math.min(cost7, cost8)));

        System.out.print(Math.min(min, min1));
        return Math.min(min, min1);
    }

    private static int diff(int[][] numbers, int[][] frame) {
        int cost = 0;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                cost += Math.abs(numbers[i][j] - frame[i][j]);
            }
        }
        return cost;
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int[][] s = new int[3][3];

        for (int i = 0; i < 3; i++) {
            String[] sRowItems = scanner.nextLine().split(" ");
            scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

            for (int j = 0; j < 3; j++) {
                int sItem = Integer.parseInt(sRowItems[j]);
                s[i][j] = sItem;
            }
        }

        int result = formingMagicSquare(s);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedWriter.close();

        scanner.close();
    }
}
